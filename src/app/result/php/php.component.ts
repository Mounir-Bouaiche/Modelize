import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'php',
  templateUrl: './php.component.html',
  styleUrls: ['./php.component.scss']
})
export class PhpComponent implements OnInit {
  @Input() model;
  constructor() { }

  ngOnInit(): void {
  }

}
