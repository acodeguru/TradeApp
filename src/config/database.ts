import * as dotenv from "dotenv";
dotenv.config();

import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPort = Number(process.env.DB_PORT)

console.log("------------------------------------------------#######################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
console.log(dbPort)
console.log("------------------------------------------------#######################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PWD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDriver
})

export default sequelizeConnection