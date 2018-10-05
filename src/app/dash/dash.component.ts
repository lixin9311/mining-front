import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})

export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Lease Time', cols: 1, rows: 1, content: `sdf`, cardType: 'cardStyle2'},
          { title: 'Metrics', cols: 1, rows: 1, content: 'hahahahaha <br>', cardType: 'cardStyle1', metrics: this.metrics },
          { title: 'Total Mined', cols: 1, rows: 1, content: 'hahahahaha <br>', cardType: 'cardStyle2' },
          { title: 'Balance', cols: 1, rows: 1, content: 'hahahahaha <br>', cardType: 'cardStyle2' }
        ];
      }

      return [
        { title: 'Lease Time', cols: 2, rows: 1, content: `<div> </div>`, cardType: 'cardStyle2'},
        { title: 'Metrics', cols: 1, rows: 1, content: 'hahahahaha <br>', cardType: 'cardStyle1', metrics: this.metrics },
        { title: 'Total Mined', cols: 1, rows: 2, content: 'hahahahaha <br>', cardType: 'cardStyle2' },
        { title: 'Balance', cols: 1, rows: 1, content: 'hahahahaha <br>', cardType: 'cardStyle2' }
      ];
    })
  );

  metrics = [{metric: 'Uptime', value: '123hr'},
  {metric: 'Accept Rate', value: '99%'},
  {metric: 'Temp', value: '22C'}];

  constructor(private breakpointObserver: BreakpointObserver) { }
}
