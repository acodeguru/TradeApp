import { Model } from "sequelize";

export interface ITrade extends Model{
    id: number;
    ticker: string;
    amount: number;
    price: number;
    executionType: ExecutionType;
    executionDate: Date;
    userId: number;
  }