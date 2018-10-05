import {Component, OnInit, AfterViewInit} from '@angular/core';
import {CardTemplateBaseComponent} from '../card-template-base';
import * as CanvasJS from './canvasjs.min'; // CanvasJS.min.js
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card3',
  templateUrl: './card3.component.html',
  styleUrls: ['./card3.component.css']
})

export class Card3Component extends CardTemplateBaseComponent implements OnInit, AfterViewInit {
  data: {x: Number, y: number[]}[];
  chart: any;
  inited = false;
  constructor(private http: HttpClient) {
    super();
  }
  ngOnInit() {
    this.chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'BTC Price in 30 Days'
      },
      axisX: {
        interval: 1,
        valueFormatString: ''
      },
      axisY: {
        includeZero: false,
        prefix: '$',
        title: 'Price'
      },
      toolTip: {
        content: 'Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}'
      },
      data: [{
        type: 'candlestick',
        yValueFormatString: '$##0.00',
        dataPoints: []
      }]
    });
  }
  updateData() { }
  ngAfterViewInit() {
    if (!this.inited) {
      setTimeout(() => {
        this.chart.render();
   }, 100);
    }
  }
}
