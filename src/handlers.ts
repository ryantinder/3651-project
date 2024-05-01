import type { Handler, Price } from ".";
import { getTickerPrice } from "./prices";

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