import express from "express";
import { AAPL_Handler, ADA_Handler, AMZN_Handler, ARB_Handler, BTC_Handler, COIN_Handler, DOGE_Handler, ETH_Handler, GOOGL_Handler, META_Handler, MSFT_Handler, NVDA_Handler, SOL_Handler, TSLA_Handler } from "./handlers";
import { ARB } from "./prices";

const app = express();

export interface Price {
    ticker: string;
    price: number;
}

export type Handler = () => Promise<Price>;

const Handlers: Record<string, Handler> = {
    "ETH" : ETH_Handler,
    "BTC" : BTC_Handler,
    "DOGE" : DOGE_Handler,
    "SOL" : SOL_Handler,
    "ARB" : ARB_Handler,
    "AAPL" : AAPL_Handler,
    "AMZN" : AMZN_Handler,
    "GOOGL" : GOOGL_Handler,
    "MSFT" : MSFT_Handler,
    "TSLA" : TSLA_Handler,
    "NVDA" : NVDA_Handler,
    "META" : META_Handler,
    "COIN" : COIN_Handler,
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