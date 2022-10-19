import express, {Request, response, Response} from "express";
import { createTrade, deleteTrade, getSummaryTrade, updateTrade } from "../models/query/tradeQuery";
import { ITrade } from "../models/types/tradeType";

const tradeRouter = express.Router();

tradeRouter.post("/", (req: Request, res: Response) => {
  const tradeDetails: ITrade = req.body;
  createTrade(tradeDetails).then(response => {
    return res.status(200).json({"success": response});
  })
  .catch(error => {
    console.error(error)
    return res.status(500).json({"errorMessage": error.message});
  })
});

tradeRouter.put("/:id", (req: Request, res: Response) => {
  const tradeId: Number = Number(req.params.id);
  const tradeDetails: ITrade = req.body;

  updateTrade(tradeId, tradeDetails).then(response => {
    return res.status(200).json({"success": response});
  })
  .catch(error => {
    console.error(error)
    return res.status(500).json({"errorMessage": error.message});
  })
});


tradeRouter.delete("/:id", (req: Request, res: Response) => {
  const tradeId: Number = Number(req.params.id);
  const tradeDetails: ITrade = req.body;

  deleteTrade(tradeId, tradeDetails).then(response => {
    return res.status(200).json({"success": response});
  })
  .catch(error => {
    console.error(error)
    return res.status(500).json({"errorMessage": error.message});
  })
});

tradeRouter.get("/", (req: Request, res: Response) => {
  
  const UserId = req.query.UserId == undefined ? null :  req.query.UserId;
  const executionStartDate = req.query.executionStartDate == null ? '' : req.query.executionStartDate;
  const executionEndDate = req.query.executionEndDate == null ? "" : req.query.executionEndDate;
  const executionType = req.query.executionType == null ? "" : req.query.executionType;

  getSummaryTrade(UserId, executionStartDate, executionEndDate, executionType).then(response => {
    return res.status(200).json({"success": response});
  })
  .catch(error => {
    console.error(error)
    return res.status(500).json({"errorMessage": error.message});
  })
});

export {tradeRouter};