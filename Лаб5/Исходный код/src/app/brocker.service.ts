import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http'
import {Brocker} from './brocker';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BrockerService {

  private homeServ = 'http://127.0.0.1:3000/brockers/';


  public getBrocker(): Observable<any> {
    return this.http.get<any>(this.homeServ);
  }

  public  getBrocke(id: number): Observable<Brocker> {
    const url = `${this.homeServ}${id}`
    return this.http.get<Brocker>(url);
  }

  public update(brocker: Brocker): Observable<any> {
    return this.http.put(this.homeServ, brocker, httpOptions);
  }

  public addBrocker (brocker: Brocker): Observable<Brocker> {
    return this.http.post<Brocker>(this.homeServ, brocker, httpOptions);
  }

  public deleteHero (brocker: Brocker | number): Observable<Brocker> {
    const id = typeof brocker === 'number' ? brocker : brocker.id;
    const url = `${this.homeServ}${id}`;

    return this.http.delete<Brocker>(url, httpOptions);
  }

  constructor(
    private http: HttpClient
  ) { }
}
