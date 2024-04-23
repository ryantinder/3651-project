import type { Handler, Price } from ".";

export const ETH_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "ETH", price: 3400 };
}

export const BTC_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "BTC", price: 60000 };
}

export const ADA_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "ADA", price: 2.5 };
}

export const DOGE_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "DOGE", price: 0.3 };
}

export const SOL_Handler: Handler = async () : Promise<Price> => {
    return { ticker: "SOL", price: 110 };
}