const dev = process.env.NODE_ENV === `development`
const stargate =
  process.env.STARGATE ||
  (dev
    ? `https://proxy.antlia.io:9071/`
    : `https://proxy.antlia.io:9071/`)

const faucet =
  process.env.FAUCET ||
  (dev
    ? `https://proxy.testnet.color-platform.rnssol.com:8000/claim/wallet`
    : `https://proxy.testnet.color-platform.org:8010/claim/wallet`)

const shorturl =
  process.env.SHORTURL ||
  (dev
    ? `https://s.testnet.color-platform.rnssol.com/encode/`
    : `https://s.testnet.color-platform.org/encode/`)

const qrcode =
  process.env.QRCODE ||
  (dev
    ? `https://wallet.testnet.color-platform.rnssol.com`
    : `https://wallet.testnet.color-platform.org`)

const rpc =
  process.env.RPC ||
  (dev
    ? `https://rpc.antlia.io/`
    : `https://rpc.antlia.io/`)

const chain = process.env.CHAIN || (dev ? `antlia-test-01` : `antlia-test-01`)

export default {
  name: `colorwallet`,
  development: dev,
  network: process.env.NETWORK || `antlia-test-01`,
  stargate,
  rpc,
  qrcode,
  faucet,
  shorturl,
  chain: chain,
  google_analytics_uid: process.env.GOOGLE_ANALYTICS_UID || "",
  sentry_dsn: process.env.SENTRY_DSN || "",
  node_halted_timeout: 120000,
  block_timeout: 10000,
  default_gas_price: dev ? 1e-9 : 2.5e-8, // recommended from Color Platform Docs
  version: process.env.RELEASE,

  // Ledger
  CosmosAppTestModeAllowed: false
}
