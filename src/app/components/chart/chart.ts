import {Component} from '@angular/core';
import {LineChart, Message} from 'primeng/primeng';

import {Player} from './../player/player';
import {Balance} from './../player/balance';
import {AccountPosition} from './../accountPosition/accountPosition';
import {TimeEntry} from './../accountPosition/timeentry';
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
              .getAccountHistory(player.id)
              .subscribe((data:TimeEntry[]) => {
                  player.accountHistory = data;
                  let key;
                  for (key in data) {
                    let entry:TimeEntry = player.accountHistory[key];
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
    let labels = [];
    let datasets = [];
    let key;
    for (key in this.players) {
      let player:Player = this.players[key];
      let playerData = [];
      let historyKey;
      for (historyKey in player.accountHistory) {
        let accountHistory:TimeEntry = player.accountHistory[historyKey];
        if (accountHistory.balance == null) {
          playerData.push(null);
        } else {
          playerData.push(accountHistory.balance / 100);
        }
        labels.push(accountHistory.date);
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

    this
      .
      data = {
      labels: labels,
      datasets: datasets
    }
  }
  ;
}
