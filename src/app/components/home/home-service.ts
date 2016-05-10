import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Player } from './player';

@Injectable()
export class PlayerService {

  private actionUrl:string;
  private headers:Headers;

  constructor(private http:Http) {

    this.actionUrl = 'http://localhost:8080/pokertracker/resources/players/';

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getAll = ():Observable<Player[]> => {
    return this.http
      .get(this.actionUrl)
      .map(res => res.json());
  }

  public find = (id:number):Observable<Player> => {
    return this.http
      .get(this.actionUrl + id)
      .map(res => res.json());
  }

  public create = (firstName:string, lastName:string):Observable<Player> => {
    var toAdd = JSON.stringify({firstName: firstName, lastName: lastName});
    return this.http
      .post(this.actionUrl, toAdd, {headers: this.headers})
      .map(res => res.json());
  }

  public update = (id:number, itemToUpdate:Player):Observable<Player> => {
    return this.http
      .put(this.actionUrl + id, JSON.stringify(itemToUpdate), {headers: this.headers})
      .map(res => res.json());
  }

  public delete = (id:number):Observable<Response> => {
    return this.http
      .delete(this.actionUrl + id);
  }
}
