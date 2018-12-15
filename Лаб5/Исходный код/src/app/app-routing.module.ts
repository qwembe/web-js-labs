import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrokersComponent} from './brokers/brokers.component';
import {BrockerDetailesComponent} from './brokers/brocker-detailes/brocker-detailes.component';
import {SettingsComponent} from './settings/settings.component';
import {StocksComponent} from './stocks/stocks.component';
import {StockDetailesComponent} from './stocks/stock-detailes/stock-detailes.component';

const routes: Routes = [
  {path: 'brockers', component: BrokersComponent},
  {path: 'brockers/:id', component: BrockerDetailesComponent},
  {path: 'stocks/:id', component: StockDetailesComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'stocks', component: StocksComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
