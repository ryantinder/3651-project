import express from "express";
import { ADA_Handler, BTC_Handler, DOGE_Handler, ETH_Handler, SOL_Handler } from "./handlers";

const app = express();

export interface Price {
    ticker: string;
    price: number;
}

export type Handler = () => Promise<Price>;

const Handlers: Record<string, Handler> = {
    "ETH" : ETH_Handler,
    "BTC" : BTC_Handler,
    "ADA" : ADA_Handler,
    "DOGE" : DOGE_Handler,
    "SOL" : SOL_Handler
}

app.use(express.json());

app.get("/tickers", async (req, res) => {
    const tickers = Object.keys(Handlers);
    res.status(200).json({ tickers: tickers });
})

app.get("/:ticker", async (req, res) => {
    const { ticker } = req.params;
    console.log("fetching price for " + ticker)

    if (!Handlers[ticker.toUpperCase()]) {
        return res.status(404).json({ error: "Ticker not found" });
    }
    
    res.status(200).json(await Handlers[ticker.toUpperCase()]());
})

app.listen(process.env.PORT || 3333, () => {
    console.log(process.env.PORT)
    console.log(`Server is running on port ${process.env.PORT || 3333}...`)
})