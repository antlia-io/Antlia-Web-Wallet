const dev = process.env.NODE_ENV === `development`
const stargate =
  process.env.STARGATE ||
  (dev ? `https://color-platform.rnssol.com:9071` : `https://color-platform.rnssol.com:9071`)

const rpc =
  process.env.RPC ||
  (dev
    ? `https://color-platform.rnssol.com:26657`
    : `https://color-platform.rnssol.com:26657`)

export default {
  name: `colorwallet`,
  development: dev,
  network: process.env.NETWORK || `local-testnet`,
  stargate,
  rpc,
  google_analytics_uid: process.env.GOOGLE_ANALYTICS_UID || "",
  sentry_dsn: process.env.SENTRY_DSN || "",
  node_halted_timeout: 120000,
  block_timeout: 10000,
  default_gas_price: dev ? 1e-9 : 2.5e-8, // recommended from Color Docs
  version: process.env.RELEASE,

  // Ledger
  CosmosAppTestModeAllowed: false
}
