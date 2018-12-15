import {Component, OnInit} from '@angular/core';
import {Brocker} from '../brocker';
import {BrockerService} from '../brocker.service';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {

  public brockers: Brocker[];

  getBrocker(): void {
    this.brockerService.getBrocker()
      .subscribe(brockers => this.brockers = brockers.data);
  }

  constructor(private brockerService: BrockerService) {
  }

  ngOnInit() {
    this.getBrocker();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.brockerService.addBrocker({ name } as Brocker)
      .subscribe(brocker => {
        this.brockers.push(brocker);
      });
  }

  delete(brocker: Brocker): void {
    this.brockers = this.brockers.filter(h => h !== brocker);
    this.brockerService.deleteHero(brocker).subscribe();
  }


}
