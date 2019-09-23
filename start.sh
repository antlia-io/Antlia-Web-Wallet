#!/bin/sh
# This is a comment!

if [ "$1" = "staging" ]
then
  echo Building wallet with staging Enviorment

  STARGATE=https://proxy.testnet.color-platform.rnssol.com:9071 RPC=https://rpc.testnet.color-platform.rnssol.com yarn build

elif [ "$1" = "production" ]
then
  echo Building wallet with production Enviorment

  STARGATE=https://proxy.testnet.color-platform.org:9071 RPC=https://rpc.testnet.color-platform.org yarn build
else 
  echo Environment not provided, e.g staging
fi

#npm install
#STARGATE=https://proxy.testnet.color-platform.rnssol.com:9071 RPC=https://rpc.testnet.color-platform.rnssol.com yarn build
#yarn serve:dist


