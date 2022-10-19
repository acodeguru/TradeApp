import { BuildOptions, DataTypes, Model } from "sequelize"
import sequelizeConnection from "../config/database";
import { ITrade } from "./types/tradeType";


type ITradeStatic = typeof Model & {
  new(values?: object, options?: BuildOptions ): ITrade
}

const Trade = <ITradeStatic>sequelizeConnection.define('trade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ticker: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  executionType: {
    type: DataTypes.ENUM({
      values: ['sell', 'buy']
    }),
    allowNull: false
  },
  executionDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'user',
      key: 'id',
    },
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true,
})

export default Trade