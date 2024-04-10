import express from "express";

const app = express();

interface Price {
    ticker: string;
    price: number;
}

app.use(express.json());

app.get("/tickers", async (req, res) => {})

app.get("/:ticker", async (req, res) => {
    const { ticker } = req.params;
    console.log("fetching price for " + ticker)
    res.status(200).json({ ticker: ticker, price: 19.65});
})

app.listen(process.env.PORT || 3333, () => {
    console.log("Server running on port 3333")
})