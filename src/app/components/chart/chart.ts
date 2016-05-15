import {Component} from '@angular/core';
import {LineChart, Message} from 'primeng/primeng';

@Component({
  selector: 'home',
  templateUrl: 'app/components/chart/chart.html',
  styleUrls: ['app/components/chart/chart.css'],
  providers: [],
  directives: [LineChart],
  pipes: []
})
export class LineChartDemo {
  data:any;

  constructor() {
    let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    let datasets = [];
    let one = {
      label: 'My First dataset',
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [65, null, 80, 81, 56, 55, 40]
    };
    datasets.push(one);
    let two = {
      label: 'My Second dataset',
      fillColor: 'rgba(151,187,205,0.2)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,1)',
      data: [28, 48, 40, 19, 86, 27, 90]
    };
    datasets.push(two);
    this.data = {
      labels: labels,
      datasets: datasets
    }
  }
}
