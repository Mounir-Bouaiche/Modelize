import {Injectable} from '@angular/core';
import {Relationship, RelationshipCardinality} from '../model-tools/relationship/relationship.component';

@Injectable({providedIn: 'root'})
export class ModelService {
  private MODELS: Model[] = [
    {
      id: '147d74f8d8',
      name: 'MANY_TO_MANY',
      tables: [
        {
          name: 'Table 1',
          fields: [
            {
              name: 'column1',
              type: MySQLType.INTEGER,
              primary_key: true,
              auto_increment: true
            },
            {
              name: 'column1',
              type: MySQLType.DATE
            }
          ],
          pos: {x: 0, y: 0}
        },
        {
          name: 'Table 2',
          fields: [
            {
              name: 'column3',
              type: MySQLType.INTEGER,
              primary_key: true,
            },
            {
              name: 'column4',
              type: MySQLType.INTEGER
            }
          ],
          pos: {x: 500, y: 0}
        }
      ],
      relationships: [
        {
          name: 'Relationship',
          source: 'Table 1',
          target: 'Table 2',
          type: RelationshipCardinality.MANY_TO_MANY
        }
      ]
    },
    {
      id: 'HJHSUS',
      name: 'MANY_TO_ONE',
      tables: [
        {
          name: 'Table 1',
          fields: [
            {
              name: 'column1',
              type: MySQLType.INTEGER,
              primary_key: true,
              auto_increment: true
            },
            {
              name: 'column1',
              type: MySQLType.DATE
            }
          ],
          pos: {x: 0, y: 0}
        },
        {
          name: 'Table 2',
          fields: [
            {
              name: 'column3',
              type: MySQLType.INTEGER,
              primary_key: true,
            },
            {
              name: 'column4',
              type: MySQLType.INTEGER
            }
          ],
          pos: {x: 500, y: 0}
        }
      ],
      relationships: [
        {
          name: 'Relationship',
          source: 'Table 1',
          target: 'Table 2',
          type: RelationshipCardinality.MANY_TO_ONE
        }
      ]
    },
    {
      id: 'HJHSDDUS',
      name: 'ONE_TO_MANY',
      tables: [
        {
          name: 'Table 1',
          fields: [
            {
              name: 'column1',
              type: MySQLType.INTEGER,
              primary_key: true,
              auto_increment: true
            },
            {
              name: 'column1',
              type: MySQLType.DATE
            }
          ],
          pos: {x: 0, y: 0}
        },
        {
          name: 'Table 2',
          fields: [
            {
              name: 'column3',
              type: MySQLType.INTEGER,
              primary_key: true,
            },
            {
              name: 'column4',
              type: MySQLType.INTEGER
            }
          ],
          pos: {x: 500, y: 0}
        }
      ],
      relationships: [
        {
          name: 'Relationship',
          source: 'Table 1',
          target: 'Table 2',
          type: RelationshipCardinality.ONE_TO_MANY
        }
      ]
    },
    {
      id: 'HJ15151HSUS',
      name: 'ONE_TO_ONE',
      tables: [
        {
          name: 'Table 1',
          fields: [
            {
              name: 'column1',
              type: MySQLType.INTEGER,
              primary_key: true,
              auto_increment: true
            },
            {
              name: 'column1',
              type: MySQLType.DATE
            }
          ],
          pos: {x: 0, y: 0}
        },
        {
          name: 'Table 2',
          fields: [
            {
              name: 'column3',
              type: MySQLType.INTEGER,
              primary_key: true,
            },
            {
              name: 'column4',
              type: MySQLType.INTEGER
            }
          ],
          pos: {x: 500, y: 0}
        }
      ],
      relationships: [
        {
          name: 'Relationship',
          source: 'Table 1',
          target: 'Table 2',
          type: RelationshipCardinality.ONE_TO_ONE
        }
      ]
    }
  ];

  getModels(): Model[] {
    return this.MODELS;
  }

  getModel(modelName?: string): Model {
    if (modelName) {
      return this.MODELS.find(value => value.name === modelName);
    }
    return this.MODELS[0];
  }
}

export enum MySQLType {
  VARCHAR, INTEGER, DATE, TIME, DATE_TIME, TIMESTAMP, CHAR, DECIMAL, BLOB
}

export interface TableModelField {
  name: string;
  type: MySQLType | string;
  length?: number;
  primary_key?: boolean;
  auto_increment?: boolean;
  nullable?: boolean;
  unique?: boolean;
  default?: any;
}

export interface TableModel {
  name: string;
  fields: TableModelField[];
  pos?: { x: number; y: number; };
}

export interface Model {
  id: string;
  name: string;
  tables: TableModel[];
  relationships: Relationship[];
}
