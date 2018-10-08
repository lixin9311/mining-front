import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CardTemplateBaseComponent } from '../card-template-base';
import * as CanvasJS from './canvasjs.min'; // CanvasJS.min.js

export interface Record {
  Date: number;
  Price: number;
  Open: number;
  High: number;
  Low: number;
  Vol: number;
}

export interface Resp {
  error: string;
  Records: Record[];
}

@Component({
  selector: 'app-card3',
  templateUrl: './card3.component.html',
  styleUrls: ['./card3.component.css']
})

export class Card3Component extends CardTemplateBaseComponent implements OnInit, AfterViewInit {
  chart: any;
  inited = false;

  ngOnInit() {
    const chartdata = [];
    for (let i = 0; i < this.data.chartData.length; i++) {
      chartdata.push({
        x: new Date(this.data.chartData[i].Date * 1000),
        y: [this.data.chartData[i].Open, this.data.chartData[i].High,
        this.data.chartData[i].Low, this.data.chartData[i].Price]
      });
    }
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
        // title: 'Price'
      },
      toolTip: {
        content: 'Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}'
      },
      data: [{
        type: 'candlestick',
        yValueFormatString: '$##0.00',
        dataPoints: chartdata
      }]
    });
  }

  ngAfterViewInit() {
    if (!this.inited) {
      setTimeout(() => {
        this.chart.render();
      }, 100);
    } else {
      this.inited = true;
    }
  }
}
