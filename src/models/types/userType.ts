import { Model } from "sequelize";

export interface IUser extends Model {
    id: number;
    name: string;
  }
  