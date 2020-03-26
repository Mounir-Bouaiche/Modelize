import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  constructor() { }
}

export enum MySQLType {
  VARCHAR, INTEGER, DATE
}

export interface TableModelField {
  name: string;
  type: MySQLType;
  length: number;
  nullable: boolean;
  unique: boolean;
  primary_key: boolean;
  auto_increment: boolean;
  default?: any;
}

export interface TableModel {
  name: string;
  fields: TableModelField[];
}

export interface Model {
  id: string;
  name: string;
  table: TableModel[];
}
