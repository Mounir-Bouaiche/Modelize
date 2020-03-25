import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  searchWord = '';
  models: string[];

  constructor() { }

  ngOnInit(): void {
    this.models = [];
    for (let i = 0; i < 12; i++) {
      this.models.push('model 1');
    }
  }

  itemClicked(item: string) {
  }
}
