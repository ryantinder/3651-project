import type { Handler, Price } from ".";
import { getStockPrice, getTickerPrice } from "./prices";

export const ETH_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "ETH", price: await getTickerPrice("ETH") };
}

export const BTC_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "BTC", price: await getTickerPrice("BTC") };
}

export const ADA_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "ADA", price: await getTickerPrice("ADA")};
}

export const DOGE_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "DOGE", price: await getTickerPrice("DOGE")};
}

export const SOL_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "SOL", price: await getTickerPrice("SOL") };
}

export const ARB_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "ARB", price: await getTickerPrice("ARB")};
}

export const AAPL_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "AAPL", price: await getStockPrice("AAPL")};
}

export const AMZN_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "AMZN", price: await getStockPrice("AMZN")};
}

export const GOOGL_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "GOOGL", price: await getStockPrice("GOOGL")};
}

export const MSFT_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "MSFT", price: await getStockPrice("MSFT")};
}

export const TSLA_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "TSLA", price: await getStockPrice("TSLA")};
}

export const NVDA_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "NVDA", price: await getStockPrice("NVDA")};
}

export const META_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "META", price: await getStockPrice("META")};
}

export const COIN_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "COIN", price: await getStockPrice("COIN")};
}

