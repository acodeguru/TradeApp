import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { tradeRouter } from "./src/routes/tradeRouter";
import sequelizeConnection from "./src/config/database";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/trades", tradeRouter);

sequelizeConnection.sync().then(
    async () => {
        try {
            app.listen(process.env.PORT, () => {
                console.log(`Server running on http://localhost:${process.env.PORT}`)
            })
        } catch (err) {
            console.log(`Error occurred: ${err}`)
        }

    }
)
