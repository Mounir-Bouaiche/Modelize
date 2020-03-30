import {Component, Input, OnInit} from '@angular/core';
import {Model} from '../../services/model.service';

@Component({
  selector: 'sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss']
})
export class SqlComponent implements OnInit {
  @Input() model: Model;

  ngOnInit(): void {
  }
}
