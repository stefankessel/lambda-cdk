import { Stack, StackProps } from 'aws-cdk-lib'
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import { getSuffixFromStack } from '../../utils/getSuffixFromStack'

export class DataStack extends Stack {
  public readonly finderTable: ITable

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const suffix = getSuffixFromStack(this)
    const table = new Table(this, 'FinderTable', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      tableName: `FinderTable-${suffix}`,
    })
    this.finderTable = table
  }
}
