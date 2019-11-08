"use strict"

import Cosmos from "@rnssolution/color-api"
import RpcWrapper from "./rpcWrapper.js"

export default function Connector(stargateUrl) {
  const cosmosClient = new Cosmos(stargateUrl, "no_address")
  const newRpcClient = RpcWrapper(cosmosClient)

  Object.assign(cosmosClient, newRpcClient)

  return cosmosClient
}
