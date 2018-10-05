import { Component, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { getUrlParam, str2char, char2str } from '../utils';
import { throwError } from 'rxjs';
import { DashService } from './dash.service';

export interface DialogData {
  status: string;
  message: string;
}

export interface Status {
  error: string;
  lifetime_profit: number;
  start_time: number;
  btcjpy: number;
  btcusd: number;
  miner_count: number;
}

const customerAPI = 'https://mining.d.tyd.us/stats/';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})

export class DashComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.updateCards();

  metrics: { metric: string, value: string }[];

  isSmallScreen = this.breakpointObserver.isMatched(Breakpoints.Handset);

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient,
    public dialog: MatDialog, private dashService: DashService) { }

  ngOnInit() {
    let address = getUrlParam('address');
    if (address === '') {
      address = localStorage.getItem('address');
      if (address === 'null') {
        setTimeout(() => {
          this.openDialog('No address', 'you need to specify address');
        }, 1000);
        return;
      }
    }
    localStorage.setItem('address', address);
    this.dashService.changeAddress(address);
    const api = customerAPI + address;
    console.log(address);
    this.http.get(api).subscribe(
      (resp: Status) => {
        console.log(resp);
        if (resp.error !== undefined) {
          this.openDialog('error', resp.error);
          return;
        }
        const uptime = ((Date.now() / 1000 - resp.start_time) / 3600).toFixed(1);
        this.metrics = [
          { metric: 'Mining Time', value: uptime + ' Hr' },
          { metric: 'Miners', value: resp.miner_count.toString() },
          { metric: 'Total Profit', value: (resp.lifetime_profit / 1E8).toFixed(5) + ' BTC' },
          { metric: 'Profit (est.)', value: (resp.lifetime_profit / 1E8 * resp.btcusd).toFixed(2) + ' USD' },
          { metric: 'Profit (est.)', value: (resp.lifetime_profit / 1E8 * resp.btcjpy).toFixed(2) + ' JPY' }];
        this.cards = this.updateCards();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      this.openDialog(error.status.toString(), error.message);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  openDialog(status: string, reason: string) {
    const dialogRef = this.dialog.open(DashDialogComponent, {
      width: '250px',
      data: { status: status, message: reason }
    });
  }

  updateCards() {
    return this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          this.isSmallScreen = true;
          return [
            { title: 'BTC Price', cols: 2, rows: 2, content: `BTC Price Here`, cardType: 'cardStyle3' },
            { title: 'Metrics', cols: 2, rows: 2, content: 'stab', cardType: 'cardStyle1', metrics: this.metrics },
            { title: 'Profitability', cols: 1, rows: 1, content: '100.00000', unit: 'BTC/day', cardType: 'cardStyle2' },
            { title: 'Hash Speed', cols: 1, rows: 1, content: '50', unit: 'GH/sec', cardType: 'cardStyle2' }
          ];
        }

        this.isSmallScreen = false;
        return [
          { title: 'BTC Price', cols: 4, rows: 2, content: `BTC Price Here`, cardType: 'cardStyle3' },
          { title: 'Metrics', cols: 2, rows: 2, content: 'stab', cardType: 'cardStyle1', metrics: this.metrics },
          { title: 'Profitability', cols: 1, rows: 1, content: '100.00000', unit: 'BTC/day', cardType: 'cardStyle2' },
          { title: 'Hash Speed', cols: 1, rows: 1, content: '50', unit: 'GH/sec', cardType: 'cardStyle2' }
        ];
      })
    );
  }
}

@Component({
  selector: 'app-dash-dialog',
  templateUrl: './dash.dialog.html',
  styleUrls: ['./dash.component.css'],
})

export class DashDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DashDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
