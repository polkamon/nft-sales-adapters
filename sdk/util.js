require("dotenv").config();
const { AVAILABLE_PROTOCOLS } = require("./constants");
const key = process.env.DAPPRADAR_API_KEY;
const headers = {
    key,
    protocol: AVAILABLE_PROTOCOLS.ETH,
};

const WS_PROXY_URL = "ws://nft-sales-websocket.dappradar.com";
// // @see https://web3js.readthedocs.io/en/v1.2.11/web3.html#configuration
const HTTP_PROXY_URL = "http://nft-sales-websocket.dappradar.com";

const options = {
    timeout: 1000,
    // We had to adjust here as the http lib expects an array value (see node_modules/web3-providers-http/src/index.js, line 79 -> .forEach() function)
    headers: Object.entries(headers).map(([key, value]) => ({ name: key, value })),
    clientConfig: {
        maxReceivedFrameSize: 100 * 1000 * 1000,
        maxReceivedMessageSize: 100 * 1000 * 1000,
    },
    reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 1000,
        onTimeout: false,
    },
};

const asyncTimeout = async (seconds = 10) => new Promise(r => setTimeout(r, 1000 * seconds));
module.exports = { WS_PROXY_URL, HTTP_PROXY_URL, options, asyncTimeout, AVAILABLE_PROTOCOLS };
