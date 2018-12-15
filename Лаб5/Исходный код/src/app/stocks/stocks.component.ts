import {Component, OnInit} from '@angular/core';
import {Stock} from '../stock';
import {StockService} from '../stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  public stockers: Stock[];

  getStocke(): void {
    this.stockService.getStockes()
      .subscribe(stockes => this.stockers = stockes.data);
  }

  constructor(private stockService: StockService) {
  }

  ngOnInit() {
    this.getStocke();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.stockService.addStocke({ name } as Stock)
      .subscribe(stock => {
        this.stockers.push(stock);
      });
  }

  delete(stock: Stock): void {
    this.stockers = this.stockers.filter(h => h !== stock);
    this.stockService.deleteHero(stock).subscribe();
  }

}
