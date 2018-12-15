import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http'
import {Stock} from './stock';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private homeServ = 'http://127.0.0.1:3000/stockes/';

  public getStockes(): Observable<any> {
    return this.http.get<any>(this.homeServ);
  }

  public  getStocke(id: number): Observable<Stock> {
    const url = `${this.homeServ}${id}`
    return this.http.get<Stock>(url);
  }

  public update(stock: Stock): Observable<any> {
    return this.http.put(this.homeServ, stock, httpOptions);
  }

  public addStocke (stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.homeServ, stock, httpOptions);
  }

  public deleteHero (stock: Stock | number): Observable<Stock> {
    const id = typeof stock === 'number' ? stock : stock.id;
    const url = `${this.homeServ}${id}`;

    return this.http.delete<Stock>(url, httpOptions);
  }

  constructor(
    private http: HttpClient
  ) { }
}
