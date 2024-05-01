import { createPublicClient, formatUnits, http, zeroAddress, type Abi } from "viem";
import { arbitrum } from "viem/chains"

export const WETH = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
export const WBTC = "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f"
export const ARB = "0x912CE59144191C1204E64559FE8253a0e49E6548"
export const USDC = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
export const DAI = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"

export const ChainlinkRouterAbi: Abi = [
    {
        name: 'price',
        type: 'function',
        inputs: [{type: 'address', name: 'token'}],
        outputs: [
            {type: 'uint256', name: 'usd_price'},
            {type: 'uint256', name: 'eth_price'}
        ],
        stateMutability: 'view'
    }
]
export const ChainlinkOracleAbi: Abi = [
    {
        name: 'latestRoundData',
        type: 'function',
        inputs: [],
        outputs: [
            {type: 'uint80', name: 'roundId'},
            {type: 'int256', name: 'answer'},
            {type: 'uint256', name: 'startedAt'},
            {type: 'uint256', name: 'updatedAt'},
            {type: 'uint80', name: 'answeredInRound'}
        ],
        stateMutability: 'view'
    }
]

const client = createPublicClient({
    transport: http(process.env.ARB_RPC!),
    chain: arbitrum
})

const TICKER_TO_ADDRESS: {[ticker: string] : string } = {
    "ETH": zeroAddress,
    "BTC": WBTC,
    "ARB": ARB,
    "ADA": "0xadA0000000000000000000000000000000000000",
    "OP" : "0x1000000000000000000000000000000000000000",
    "SOL": "0x2000000000000000000000000000000000000000"
}

const CHAINLINK_ROUTER = '0x61A99b8A5cdd1eDdfddA0Db9a539eB4b236c36c1'
export const getTickerPrice = async (ticker: string) => {
    if (!process.env.ARB_RPC) {
        console.error("ARB_RPC not set")
        return 0
    }
    if (!TICKER_TO_ADDRESS[ticker]) {
        console.error("Ticker not supported")
        return 0
    }
    const [usd_price, eth_price] = await client.readContract({
        abi: ChainlinkRouterAbi,
        address: CHAINLINK_ROUTER,
        functionName: 'price',
        args: [TICKER_TO_ADDRESS[ticker]]
    }) as [bigint, bigint]
    return parseFloat(parseFloat(formatUnits(usd_price, 8)).toFixed(2))
}

const STOCK_TO_ADDRESS: {[ticker: string] : `0x${string}` } = {
    "AAPL": "0x8d0CC5f38f9E802475f2CFf4F9fc7000C2E1557c",
    "AMZN": "0xd6a77691f071E98Df7217BED98f38ae6d2313EBA",
    "COIN": "0x950DC95D4E537A14283059bADC2734977C454498",
    "GOOGL": "0x1D1a83331e9D255EB1Aaf75026B60dFD00A252ba",
    "META": "0xcd1bd86fDc33080DCF1b5715B6FCe04eC6F85845",
    "MSFT": "0xDde33fb9F21739602806580bdd73BAd831DcA867",
    "NVDA": "0x4881A4418b5F2460B21d6F08CD5aA0678a7f262F",
    "TSLA": "0x3609baAa0a9b1f0FE4d6CC01884585d0e191C3E3"
}

export const getStockPrice = async (ticker: string) => {
    if (!process.env.ARB_RPC) {
        console.error("ARB_RPC not set")
        return 0
    }
    if (!STOCK_TO_ADDRESS[ticker]) {
        console.error("Ticker not supported")
        return 0
    }
    const [,answer,,,] = await client.readContract({
        abi: ChainlinkOracleAbi,
        address: STOCK_TO_ADDRESS[ticker],
        functionName: 'latestRoundData',
        args: []
    }) as [bigint, bigint, bigint, bigint, bigint]
    return parseFloat(parseFloat(formatUnits(answer, 8)).toFixed(2))
}
// console.log(await getStockPrice("AAPL"))