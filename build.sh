#!/bin/sh
# This is a comment!

if [ "$1" = "staging" ]
then
  echo Building wallet with staging Enviorment

 QRCODE=https://wallet.testnet.color-platform.rnssol.com CHAIN=colors-test-01 STARGATE=https://proxy.testnet.color-platform.rnssol.com:9071 RPC=https://rpc.testnet.color-platform.rnssol.com yarn build

elif [ "$1" = "production" ]
then
  echo Building wallet with production Enviorment

 CHAIN=colors-test-01 STARGATE=https://proxy.testnet.color-platform.org:9061 RPC=https://rpc.testnet.color-platform.org yarn build
else 
  echo Environment not provided, e.g staging
fi

#npm install
#STARGATE=https://proxy.testnet.color-platform.rnssol.com:9071 RPC=https://rpc.testnet.color-platform.rnssol.com yarn build
#yarn serve:dist


