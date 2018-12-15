import {Component, OnInit, Input} from '@angular/core';
import {Brocker} from '../../brocker';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {StockService} from '../../stock.service';
import {Stock} from '../../stock';


@Component({
  selector: 'app-stock-detailes',
  templateUrl: './stock-detailes.component.html',
  styleUrls: ['./stock-detailes.component.css']
})
export class StockDetailesComponent implements OnInit {

  stock: Stock;

  constructor(
    private route: ActivatedRoute,
    private brockerService: StockService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getStocks();
  }

  getStocks(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.brockerService.getStocke(id)
      .subscribe(stock => {
        this.stock = stock;
      });
  }

  save(): void {

    this.brockerService.update(this.stock).subscribe(_ => this.location.back());
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
