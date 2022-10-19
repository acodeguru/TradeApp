import { Op } from "sequelize";
import { Trade } from "..";
import { ITrade } from "../types/tradeType";


export const createTrade = async (trade: ITrade) => {
  try{
    const tradeIns = await Trade.create({
        id: trade.id,
        ticker: trade.ticker,
        amount: trade.amount,
        price: trade.price,
        executionType: trade.executionType,
        executionDate: trade.executionDate,
        userId: trade.userId
      })
      
      return tradeIns.id

    } catch (error) {
      console.error("Error : ",error)
      throw new Error('Error encounted')
    }
  };


  export const updateTrade = async (tradeId:Number, trade: ITrade) => {
    try{
    const tradeByUser = await Trade.findOne({
      where: { id: tradeId, userId: trade.userId },
    });
    
    if (!tradeByUser) {
      return 'No record found'
    }

    if(new Date(tradeByUser.executionDate) < new Date()) {
      return 'Record cannot be updated'
    }

    const updateTrade = tradeByUser.update({
      ticker: trade.ticker,
      amount: trade.amount,
      price: trade.price,
      executionType: trade.executionType,
      executionDate: trade.executionDate,
    })

    return updateTrade
  } catch (error) {
    console.error("Error : ",error)
    throw new Error('Error encounted')
  }
  };


  export const deleteTrade = async (tradeId:Number, trade: ITrade) => {
    try{
    const tradeByUser = await Trade.findOne({
      where: { id: tradeId, userId: trade.userId },
    });
    
    if (!tradeByUser) {
      return 'No record found'
    }

    console.log(tradeByUser.executionDate)

    if(new Date(tradeByUser.executionDate) < new Date()) {
      return 'Record cannot be deleted'
    }

    tradeByUser.destroy()
    return "record deleted"

  } catch (error) {
    console.error("Error : ",error)
    throw new Error('Error encounted')
  }
  };


  export const getSummaryTrade = async (UserId:any, executionStartDate:any, executionEndDate: any, executionType: any) => {
    try{

      let whereConditions:any = {}

      if (UserId  != -1) {
        whereConditions["UserId"] = UserId
      }
      if(executionStartDate  != "" && executionEndDate != "") {
        whereConditions["executionDate"] = {
          [Op.between]: [executionStartDate, executionEndDate]
        }
      }
      if(executionType  != ""){

        if(["buy", "sell"].includes(executionType)) {
          whereConditions["executionType"] = executionType
        }else{
          return 'No record found'
        }
        
      }

    const trades = await Trade.findAll({
      where: whereConditions,
    });
    
    if (!trades) {
      throw new Error('No record found')
    }

    return trades

  } catch (error) {
    console.error("Error : ",error)
    throw new Error('Error encounted')
  }
  };
