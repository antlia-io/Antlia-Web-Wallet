export const sendTx = {
  txProps: {
    toAddress: "cosmos123",
    amounts: [
      {
        amount: "20000",
        denom: "ucolor"
      }
    ]
  },
  txMetaData: {
    gasEstimate: 12335,
    gasPrice: {
      amount: 2000,
      denom: "ucolor"
    },
    submitType: "",
    password: ""
  }
}

export const withdrawTx = {
  txProps: {},
  txMetaData: {
    gasPrice: {
      amount: 2000,
      denom: "ucolor"
    },
    submitType: "",
    password: ""
  }
}
