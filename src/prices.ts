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
    return parseFloat(formatUnits(usd_price, 8))
}
// await getTickerPrice("ETH")