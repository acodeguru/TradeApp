import { BuildOptions, DataTypes, Model } from "sequelize"
import sequelizeConnection from "../config/database";
import { IUser } from "./types/userType";

type IUserStatic = typeof Model & {
  new(values?: object, options?: BuildOptions ): IUser
}

const User = <IUserStatic>sequelizeConnection.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true,
})

export default User