import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Home {
  players:Observable<any>;
  createdPlayer:Observable<any>;

  constructor(private http:Http) {
  }

  ngOnInit() {
    this.players = this.getPlayers();
  }

  createPlayer(firstName:string, lastName:string) {
    console.log('createPlayers called');

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    var toAdd = JSON.stringify({firstName: firstName, lastName: lastName});
    let url = `http://localhost:8080/pokertracker/resources/players`;
    return this.http
      .post(url, toAdd, {headers: headers})
      .map((res) => res.json())
      .subscribe((data:any) => this.createdPlayer = data,
        error => console.log(error),
        () => console.log('Player created'));
    ;
  }

  private getPlayers() {
    let url = `http://localhost:8080/pokertracker/resources/players`;
    return this.http
      .get(url)
      .map((res) => res.json());
  }

}
