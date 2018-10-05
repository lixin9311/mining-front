import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { Resp, Record } from './card-templates/card3/card3.component';
import { Status } from './dash.component';

const btcapi = 'http://127.0.0.1:8080/data.json';
const customerAPI = 'https://mining.d.tyd.us/stats/';

@Injectable()
export class DashService {
    address: string;
    addressChange: Subject<string> = new Subject<string>();
    btcDataChange: Subject<Resp> = new Subject<Resp>();
    statusChange: Subject<Status> = new Subject<Status>();
    constructor(private http: HttpClient) {
        this.addressChange.subscribe((value) => {
            this.address = value;
        });
    }
    changeAddress(addr: string) {
        this.addressChange.next(addr);
    }

    getBTCData() {
        // TODO: handle error
        this.http.get(btcapi).subscribe(
            (resp: Resp) => {
                console.log(resp);
                // update chart data
                this.btcDataChange.next(resp);
            },
            error => {
                this.handleError(error);
            }
        );
    }

    getStatus() {
        // TODO: handle error
        const api = customerAPI + this.address;
        this.http.get(api).subscribe(
            (resp: Status) => {
                console.log(resp);
                this.statusChange.next(resp);
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
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
