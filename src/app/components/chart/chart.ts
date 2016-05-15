import {Component} from '@angular/core';
import {LineChart, Message} from 'primeng/primeng';

import {Player} from './../player/player';
import {Balance} from './../player/balance';
import {AccountPosition} from './../accountPosition/accountPosition';
import {PlayerService} from './../player/player-service';
import {AccountPositionService} from './../accountPosition/accountposition-service';

@Component({
  selector: 'home',
  templateUrl: 'app/components/chart/chart.html',
  styleUrls: ['app/components/chart/chart.css'],
  providers: [PlayerService, AccountPositionService],
  directives: [LineChart],
  pipes: []
})
export class LineChartDemo {
  private data:any;
  private players:Player[];

  constructor(private playerService:PlayerService, private accountPositionService:AccountPositionService) {
    playerService
      .getAll()
      .subscribe((data:Player[]) => {
          this.players = data;
          let key;
          for (key in this.players) {
            let player:Player = this.players[key];
            accountPositionService
              .getAccountPositions(player.id)
              .subscribe((data:AccountPosition[]) => {
                  player.accountPositions = data;
                  let key;
                  for (key in data) {
                    let position:AccountPosition = player.accountPositions[key];
                    let bigCurrencyAmount = position.amount / 100;
                    position.formattedAmount = bigCurrencyAmount.toLocaleString('DE-CH', {minimumFractionDigits: 2}) + ' ' + position.currency;
                    let date:Date = new Date(position.date.toString());
                    position.formattedDate = date.toLocaleDateString('DE-CH') + ' ' + date.toLocaleTimeString('DE-CH');
                  }
                  this.redraw();
                },
                error => console.log(error),
                () => console.log('AccountPositions loaded!!')
              );
          }
        },
        error => console.log(error),
        () => console.log('Players loaded!!')
      );

    this.redraw();
  }

  private redraw() {
    let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    let datasets = [];
    let key;
    for (key in this.players) {
      let player:Player = this.players[key];
      let factor:number = key + 1;

      let playerData = [];
      let apKey;
      for (apKey in player.accountPositions) {
        let accountPosition:AccountPosition = player.accountPositions[apKey];
        let lastValue:number = 0;
        if (apKey > 0) {
          lastValue = playerData[apKey - 1];
        }
        playerData.push(lastValue + accountPosition.amount / 100);
      }

      datasets.push({
        label: player.firstName + ' ' + player.lastName,
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: playerData
      });
    }

    let two = {
      label: 'My Second dataset',
      fillColor: 'rgba(151,187,205,0.2)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,1)',
      data: [null, 48, 40, 19, 86, 27, 90]
    };
    datasets.push(two);
    this.data = {
      labels: labels,
      datasets: datasets
    }
  };
}
