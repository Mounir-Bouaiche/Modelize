import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Model, ModelService} from '../services/model.service';
import {ActivatedRoute} from '@angular/router';

declare const w3CodeColor;

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterContentChecked {

  ok = false;
  model: Model;

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService
  ) {
  }

  ngOnInit(): void {
    this.model = this.modelService.getModel(this.route.snapshot.paramMap.get('model'));
  }

  ngAfterContentChecked(): void {
    if (!this.ok) {
      setTimeout(() => {
        w3CodeColor();
      }, 500);
      this.ok = true;
    }
  }
}
