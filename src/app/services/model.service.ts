import {Injectable} from '@angular/core';
import {Relationship, RelationshipCardinality} from '../model-tools/relationship/relationship.component';

@Injectable({providedIn: 'root'})
export class ModelService {
  private MODELS: Model[] = [
    {
      id: 'STARTER1',
      name: 'MANY_TO_MANY',
      tables: [
        {
          id: 'STARTER1TABLE1',
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
          id: 'STARTER1TABLE2',
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
          source: 'STARTER1TABLE1',
          target: 'STARTER1TABLE2',
          type: RelationshipCardinality.MANY_TO_MANY
        }
      ]
    },
    {
      id: 'STARTER2',
      name: 'MANY_TO_ONE',
      tables: [
        {
          id: 'STARTER2TABLE1',
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
          id: 'STARTER2TABLE2',
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
          source: 'STARTER2TABLE1',
          target: 'STARTER2TABLE2',
          type: RelationshipCardinality.MANY_TO_ONE
        }
      ]
    },
    {
      id: 'STARTER3',
      name: 'ONE_TO_MANY',
      tables: [
        {
          id: 'STARTER3TABLE1',
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
          id: 'STARTER3TABLE2',
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
          source: 'STARTER3TABLE1',
          target: 'STARTER3TABLE2',
          type: RelationshipCardinality.ONE_TO_MANY
        }
      ]
    },
    {
      id: 'STARTER4',
      name: 'ONE_TO_ONE',
      tables: [
        {
          id: 'STARTER4TABLE1',
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
          id: 'STARTER4TABLE2',
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
          source: 'STARTER4TABLE1',
          target: 'STARTER4TABLE2',
          type: RelationshipCardinality.ONE_TO_ONE
        }
      ]
    }
  ];

  getModels(): Model[] {
    return this.MODELS;
  }

  getModel(id?: string): Model {
    if (id) return this.MODELS.find(model => model.name === id);
    return this.MODELS[0];
  }

  getTable(model: Model, id: string) {
    return model.tables.find(tab => tab.id === id);
  }

  randomID(length: number = 10): string {
    const pow = Math.pow(36, length);
    return Math.round((pow - Math.random() * pow)).toString(36);
  }

  uniq_table_id(model: Model): string {
    let code = '';
    do code = this.randomID(); while (model.tables.find(tab => tab.id === code));
    return code;
  }

  uniq_model_id(): string {
    let code = '';
    do code = this.randomID(); while (this.MODELS.find(model => model.id === code));
    return code;
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
  id?: string;
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
