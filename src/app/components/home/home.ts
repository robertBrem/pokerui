import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Player} from './player';
import {PlayerService} from './home-service';

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  providers: [PlayerService],
  directives: [],
  pipes: []
})
export class Home {
  players:Player[];

  constructor(private service:PlayerService) {
  }

  ngOnInit() {
    this.getPlayers();
  }

  createPlayer(firstName:string, lastName:string) {
    return this.service
      .create(firstName, lastName)
      .subscribe((data:Player) => this.players.push(data),
        error => console.log(error),
        () => console.log('Player created!!')
      );
  }

  private getPlayers() {
    this.service
      .getAll()
      .subscribe((data:Player[]) => this.players = data,
        error => console.log(error),
        () => console.log('Players loaded!!')
      );
  }

}
