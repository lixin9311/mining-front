import { Component, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { getUrlParam, str2char, char2str } from '../utils';
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

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})

export class DashComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards1 = this.updateCards(0);
  cards2 = this.updateCards(1);
  btcHistory = [];

  metrics: { metric: string, value: string }[];

  isSmallScreen = this.breakpointObserver.isMatched(Breakpoints.Handset);

  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog, private dashService: DashService) {
    this.dashService.btcDataChange.subscribe(
      value => {
        if (value.error !== undefined) {
          this.openDialog('error', value.error);
          return;
        } else {
          this.btcHistory = value.Records;
          this.cards1 = this.updateCards(0);
        }

      }
    );

    this.dashService.statusChange.subscribe(
      value => {
        if (value.error !== undefined) {
          this.openDialog('error', value.error);
          return;
        }
        this.updateStatus(value);
        this.cards2 = this.updateCards(1);
      }
    );
  }

  ngOnInit() {
    let address = getUrlParam('address');
    if (address === '') {
      address = localStorage.getItem('address');
      if (address === 'null' || address === '' || address === null) {
        setTimeout(() => {
          this.openDialog('No address', 'you need to specify address');
        }, 1000);
        return;
      }
    }
    localStorage.setItem('address', address);
    this.dashService.changeAddress(address);
    this.dashService.getBTCData();
    setInterval(
      () => this.dashService.getStatus(),
      15000
    );
    this.dashService.getStatus();
  }

  updateStatus(resp: Status) {
    const uptime = ((Date.now() / 1000 - resp.start_time) / 3600).toFixed(1);
    this.metrics = [
      { metric: 'Mining Time', value: uptime + ' Hr' },
      { metric: 'Miners', value: resp.miner_count.toString() },
      { metric: 'Total Profit', value: (resp.lifetime_profit / 1E8).toFixed(5) + ' BTC' },
      { metric: 'Profit (est.)', value: (resp.lifetime_profit / 1E8 * resp.btcusd).toFixed(2) + ' USD' },
      { metric: 'Profit (est.)', value: (resp.lifetime_profit / 1E8 * resp.btcjpy).toFixed(2) + ' JPY' }];
  }

  openDialog(status: string, reason: string) {
    const dialogRef = this.dialog.open(DashDialogComponent, {
      width: '250px',
      data: { status: status, message: reason }
    });
  }

  updateCards(group: number) {
    return this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        let newcards = [];
        if (matches) {
          this.isSmallScreen = true;
          newcards = [
            { title: 'BTC Price', cols: 2, rows: 2, content: `BTC Price Here`, cardType: 'cardStyle3', chartData: this.btcHistory },
            { title: 'Metrics', cols: 2, rows: 2, content: 'stab', cardType: 'cardStyle1', metrics: this.metrics },
            { title: 'Profitability', cols: 1, rows: 1, content: '100.00000', unit: 'BTC/day', cardType: 'cardStyle2' },
            { title: 'Hash Speed', cols: 1, rows: 1, content: '50', unit: 'GH/sec', cardType: 'cardStyle2' }
          ];
        } else {
          this.isSmallScreen = false;
          newcards = [
            { title: 'BTC Price', cols: 4, rows: 2, content: `BTC Price Here`, cardType: 'cardStyle3', chartData: this.btcHistory },
            { title: 'Metrics', cols: 2, rows: 2, content: 'stab', cardType: 'cardStyle1', metrics: this.metrics },
            { title: 'Profitability', cols: 1, rows: 1, content: '100.00000', unit: 'BTC/day', cardType: 'cardStyle2' },
            { title: 'Hash Speed', cols: 1, rows: 1, content: '50', unit: 'GH/sec', cardType: 'cardStyle2' }
          ];
        }
        switch (group) {
          case 0:
            return newcards.slice(0, 1);
          case 1:
            return newcards.slice(1);
        }
        return newcards;
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
