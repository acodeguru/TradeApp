import User from "./userModel";
import Trade from "./tradeModel";


User.hasMany(Trade, {foreignKey: "user_id", sourceKey: "id"})
Trade.belongsTo(User, {foreignKey: "user_id", targetKey: "id"});

export { User, Trade}