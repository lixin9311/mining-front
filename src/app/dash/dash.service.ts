import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class DashService {
    address: string;
    addressChange: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
      this.addressChange.subscribe((value) => {
          this.address = value;
      });
  }
  changeAddress(addr: string) {
      this.addressChange.next(addr);
  }
}
