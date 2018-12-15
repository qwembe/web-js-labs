import {Component, OnInit, Input} from '@angular/core';
import {Brocker} from '../../brocker';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {BrockerService} from '../../brocker.service';

@Component({
  selector: 'app-brocker-detailes',
  templateUrl: './brocker-detailes.component.html',
  styleUrls: ['./brocker-detailes.component.css']
})
export class BrockerDetailesComponent implements OnInit {


  brocker: Brocker;

  constructor(
    private route: ActivatedRoute,
    private brockerService: BrockerService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getBrocker();
  }

  getBrocker(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.brockerService.getBrocke(id)
      .subscribe(brocker => {
        console.log(brocker);
        this.brocker = brocker;
      });
  }

  save(): void {
    if (this.brocker.money > 0) {
      this.brockerService.update(this.brocker).subscribe(_ => this.location.back());
    }
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
