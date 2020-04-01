import {Component, OnInit} from '@angular/core';
import {Model, ModelService} from '../services/model.service';
import {ActivatedRoute} from '@angular/router';

export function camel_case(st: string, cap?: boolean) {
  st = st.toLowerCase();
  if (st.includes(' ')) {
    st.replace(/[ ]{2,}/g, ' ');
  }
  const St: string[] = st.split('');
  for (let i in St) {
    if (St[i] === ' ') {
      St[parseInt(i) + 1] = St[parseInt(i) + 1].toUpperCase();
    }
  }
  if (cap) {
    St[0] = St[0].toUpperCase();
  }
  return St.join('').replace(' ', '');
}

@Component({
  selector: 'result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
  model: Model;

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService
  ) {
  }

  ngOnInit(): void {
    this.model = this.modelService.getModel(this.route.snapshot.paramMap.get('model'));
  }
}
