import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrokersComponent } from './brokers/brokers.component';
import { StocksComponent } from './stocks/stocks.component';
import { SettingsComponent} from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { BrockerDetailesComponent } from './brokers/brocker-detailes/brocker-detailes.component';
import { StockDetailesComponent } from './stocks/stock-detailes/stock-detailes.component';



@NgModule({
  declarations: [
    AppComponent,
    BrokersComponent,
    StocksComponent,
    SettingsComponent,
    BrockerDetailesComponent,
    StockDetailesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {



}

