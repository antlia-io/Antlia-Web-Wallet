export const bankTxs = [
  {
    hash: `not a real hash 0`,
    time: new Date(2042).toISOString(),
    height: `3436`,
    tx: {
      type: `8EFE47F0625DE8`,
      value: {
        msg: [
          {
            type: `color/MsgSend`,
            value: {
              from_address: `A`,
              amount: [{ denom: `uclr`, amount: `12340000000` }],
              to_address: `B`
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        memo: `TESTING (Sent via Color Wallet)`
      },
      result: {
        gasUsed: `3324`,
        tags: [
          {
            key: `action`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          },
          {
            key: `cmVjaXBpZW50`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          }
        ]
      }
    }
  },
  {
    hash: `not a real hash 1`,
    time: new Date(2042).toISOString(), // set by Color Wallet
    height: `3438`,
    tx: {
      type: `8EFE47F0625DE8`,
      value: {
        msg: [
          {
            type: `color/MsgSend`,
            value: {
              from_address: `B`,
              amount: [{ denom: `uclr`, amount: `12340000000` }],
              to_address: `A`
            }
          }
        ],
        fee: {
          amount: null,
          gas: `500000`
        },
        gas: `500000`,
        memo: `TESTING (Sent via Color Wallet)`
      },
      result: {
        gasUsed: `3324`,
        tags: [
          {
            key: `action`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          },
          {
            key: `cmVjaXBpZW50`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          }
        ],
        fee: {}
      }
    }
  },
  {
    hash: `not a real hash 2`,
    time: new Date(1142).toISOString(), // set by Color Wallet
    height: `466`,
    tx: {
      type: `8EFE47F0625DE8`,
      value: {
        msg: [
          {
            type: `color/MsgSend`,
            value: {
              amount: [
                { denom: `uclr`, amount: `12340000000` },
                { denom: `fabocoins`, amount: `10000000` },
                { denom: `karolycoins`, amount: `420000000` }
              ],
              from_address: `A`,
              to_address: `A`
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        memo: `TESTING (Sent via Color Wallet)`
      },
      result: {
        gasUsed: `3324`,
        tags: [
          {
            key: `action`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          },
          {
            key: `cmVjaXBpZW50`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          }
        ]
      }
    }
  }
]
export const stakingTxs = [
  {
    height: `193281`,
    txhash: `not a real hash 3`,
    gas_wanted: `101587`,
    gas_used: `101577`,
    time: new Date(2042).toISOString(),
    tags: [
      {
        key: `action`,
        value: `create_validator`
      },
      {
        key: `destination-validator`,
        value: `cosmosvaloper1qecshyc40kshszkwrtscgmsdd8tz3n4hrj9yf2`
      }
    ],
    tx: {
      type: `auth/StdTx`,
      value: {
        msg: [
          {
            type: `color/MsgCreateValidator`,
            value: {
              description: {
                moniker: `propelmind`,
                identity: ``,
                website: ``,
                details: ``
              },
              commission: {
                rate: `0.100000000000000000`,
                max_rate: `0.200000000000000000`,
                max_change_rate: `0.010000000000000000`
              },
              min_self_delegation: `1`,
              delegator_address: `cosmos1qecshyc40kshszkwrtscgmsdd8tz3n4hxx339e`,
              validator_address: `cosmosvaloper1qecshyc40kshszkwrtscgmsdd8tz3n4hrj9yf2`,
              pubkey: `cosmosvalconspub1zcjduepqjja8zg8ccvdd5rx50ad79faaaucq5vr98pr7eawnslqrscelwhaszhaq83`,
              amount: {
                denom: `uclr`,
                amount: `1000000`
              }
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `101587`
        },
        memo: `TESTING (Sent via Color Wallet)`
      }
    }
  },
  {
    height: `193281`,
    txhash: `not a real hash 4`,
    gas_wanted: `101587`,
    gas_used: `101577`,
    time: new Date(2041).toISOString(),
    tags: [
      {
        key: `action`,
        value: `edit_validator`
      },
      {
        key: `destination-validator`,
        value: `cosmosvaloper1qecshyc40kshszkwrtscgmsdd8tz3n4hrj9yf2`
      }
    ],
    tx: {
      type: `auth/StdTx`,
      value: {
        msg: [
          {
            type: `color/MsgEditValidator`,
            value: {
              validator_address: `cosmosvaloper1qecshyc40kshszkwrtscgmsdd8tz3n4hrj9yf2`,
              amount: {
                denom: `uclr`,
                amount: `1000000`
              }
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `101587`
        },
        memo: `TESTING (Sent via Color Wallet)`
      }
    }
  },
  {
    hash: `not a real hash 5`,
    time: new Date(42000).toISOString(), // set by Color Wallet
    height: `568`,
    tx: {
      type: `8EFE47F0625DE8`,
      value: {
        msg: [
          {
            type: `color/MsgDelegate`,
            value: {
              validator_address: `cosmosvaladdr15ky9du8a2wlstz6fpx3p4mqpjyrm5ctqzh8yqw`,
              amount: {
                amount: `42000000000`,
                denom: `uclr`
              }
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        memo: `TESTING (Sent via Color Wallet)`
      },
      result: {
        gasUsed: `3324`,
        tags: [
          {
            key: `action`,
            value: `delegate`
          },
          {
            key: `delegator`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          }
        ]
      }
    }
  },
  {
    hash: `not a real hash 6`,
    time: new Date(4200).toISOString(),
    height: `569`,
    tx: {
      type: `8EFE47F0625DE8`,
      value: {
        msg: [
          {
            type: `color/MsgUndelegate`,
            value: {
              validator_address: `cosmosvaladdr15ky9du8a2wlstz6fpx3p4mqpjyrm5ctqzh8yqw`,
              shares_amount: `323.000000000000000000`,
              delegator_address: `cosmos1ek9cd8ewgxg9w5xllq9um0uf4aaxaruvcw4v9e`,
              amount: {
                denom: `uclr`,
                amount: `1000000`
              }
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        memo: `TESTING (Sent via Color Wallet)`
      },
      result: {
        gasUsed: `3324`,
        tags: [
          {
            key: `action`,
            value: ``
          },
          {
            key: `cmVjaXBpZW50`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          }
        ]
      }
    }
  },
  {
    hash: `not a real hash 7`,
    time: new Date(45000).toISOString(),
    height: `567`,
    tx: {
      type: `8EFE47F0625DE8`,
      value: {
        msg: [
          {
            type: `color/MsgBeginRedelegate`,
            value: {
              validator_src_address: `cosmosvaladdr15ky9du8a2wlstz6fpx3p4mqpjyrm5ctqzh8yqw`,
              validator_dst_address: `cosmosvaladdr15ky9du8a2wlstz6fpx3p4mqpjyrm5ctplpn3au`,
              shares_amount: `30000000`,
              amount: {
                denom: `uclr`,
                amount: `1000000`
              }
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        memo: `TESTING (Sent via Color Wallet)`
      },
      result: {
        gasUsed: `3324`,
        tags: [
          {
            key: `action`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          },
          {
            key: `cmVjaXBpZW50`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          }
        ]
      }
    }
  },
  {
    height: `193281`,
    txhash: `not a real hash 8`,
    gas_wanted: `101587`,
    gas_used: `101577`,
    time: new Date(20420).toISOString(),
    tags: [
      {
        key: `action`,
        value: `unjail`
      },
      {
        key: `destination-validator`,
        value: `cosmosvaloper1qecshyc40kshszkwrtscgmsdd8tz3n4hrj9yf2`
      }
    ],
    tx: {
      type: `auth/StdTx`,
      value: {
        msg: [
          {
            type: `color/MsgUnjail`,
            value: {
              address: `cosmosvaloper1qecshyc40kshszkwrtscgmsdd8tz3n4hrj9yf2`,
              amount: {
                denom: `uclr`,
                amount: `1000000`
              }
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `101587`
        },
        memo: `TESTING (Sent via Color Wallet)`
      }
    }
  }
]
export const governanceTxs = [
  {
    hash: `not a real hash 9`,
    time: new Date(42540).toISOString(), // set by Color Wallet
    height: `56673`,
    tx: {
      type: `8EFE47F0625DE8`,
      value: {
        msg: [
          {
            type: `color/MsgSubmitProposal`,
            value: {
              proposer: `cosmosvaladdr15ky9du8a2wlstz6fpx3p4mqpjyrm5ctqzh8yqw`,
              proposal_type: `Text`,
              title: `Test Proposal`,
              description: `This is a test proposal`,
              initial_deposit: [
                {
                  denom: `uclr`,
                  amount: `1000000000`
                }
              ]
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        memo: `TESTING (Sent via Color Wallet)`
      },
      result: {
        gasUsed: `3324`,
        tags: [
          {
            key: `action`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          },
          {
            key: `cmVjaXBpZW50`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          }
        ]
      }
    }
  },
  {
    hash: `not a real hash 10`,
    time: new Date(42567).toISOString(),
    height: `56675`,
    tx: {
      type: `8EFE47F0625DE8`,
      value: {
        msg: [
          {
            type: `color/MsgDeposit`,
            value: {
              depositer: `cosmosvaladdr15ky9du8a2wlstz6fpx3p4mqpjyrm5ctqzh8yqw`,
              proposal_id: `1`,
              amount: [
                {
                  denom: `uclr`,
                  amount: `1000000000`
                }
              ]
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        memo: `TESTING (Sent via Color Wallet)`
      },
      result: {
        gasUsed: `3324`,
        tags: [
          {
            key: `action`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          },
          {
            key: `cmVjaXBpZW50`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          }
        ]
      }
    }
  },
  {
    hash: `not a real hash 11`,
    time: new Date(43300).toISOString(), // set by Color Wallet
    height: `56673`,
    tx: {
      type: `8EFE47F0625DE8`,
      value: {
        msg: [
          {
            type: `color/MsgVote`,
            value: {
              voter: `cosmos15ky9du8a2wlstz6fpx3p4mqpjyrm5ctqzh8yqw`,
              proposal_id: `1`,
              option: `Yes`
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        memo: `TESTING (Sent via Color Wallet)`
      },
      result: {
        gasUsed: `3324`,
        tags: [
          {
            key: `action`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          },
          {
            key: `cmVjaXBpZW50`,
            value: `N0ZFQzVEREE0NDA3RDVBRUQ5OTlFMTM3QjYxQTQ2QTEzQTc2MkJCNg==`
          }
        ]
      }
    }
  }
]
export const distributionTxs = [
  {
    height: `1114`,
    txhash: `not a real hash 12`,
    log: `[{"msg_index":"0","success":true,"log":""}]`,
    gas_wanted: `500000`,
    gas_used: `58806`,
    time: new Date(43300).toISOString(), // set by Color Wallet
    tags: [
      {
        key: `action`,
        value: `withdraw_delegator_reward`
      },
      {
        key: `delegator`,
        value: `cosmos18ymm350peujvq2xy9ymyqj4v34ekvnk3wydrs3`
      },
      {
        key: `source-validator`,
        value: `cosmosvaloper18ymm350peujvq2xy9ymyqj4v34ekvnk3tsekuz`
      }
    ],
    tx: {
      type: `auth/StdTx`,
      value: {
        msg: [
          {
            type: `color/MsgWithdrawDelegationReward`,
            value: {
              delegator_address: `cosmos18ymm350peujvq2xy9ymyqj4v34ekvnk3wydrs3`,
              validator_address: `cosmosvaloper18ymm350peujvq2xy9ymyqj4v34ekvnk3tsekuz`
            }
          },
          {
            type: `color/MsgWithdrawDelegationReward`,
            value: {
              delegator_address: `cosmos18ymm350peujvq2xy9ymyqj4v34ekvnk3wydrs3`,
              validator_address: `cosmosvaloper137eu59pl4r40f3qkcwu5pgav7usn0af0lpt5rx`
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        signatures: [
          {
            pub_key: {
              type: `tendermint/PubKeySecp256k1`,
              value: `A0ANSrO/dQgW/kgtMZam5DBC4De7V3PvQt6RyuK2dfhI`
            },
            signature: `RDq6lowz7Oo/dK8h686qzobzs0rI2nFrd3bHEf1P34wPYx56XXG4KysPt52B0f34I4C5bluXU5+scKtyRNTyGQ==`
          }
        ],
        memo: `TESTING (Sent via Color Wallet)`
      }
    }
  },
  {
    height: `1114`,
    txhash: `not a real hash 13`,
    log: `[{"msg_index":"0","success":true,"log":""}]`,
    gas_wanted: `500000`,
    gas_used: `58806`,
    time: new Date(43300).toISOString(), // set by Color Wallet
    tags: [
      {
        key: `action`,
        value: `set_withdraw_address`
      },
      {
        key: `delegator`,
        value: `cosmos18ymm350peujvq2xy9ymyqj4v34ekvnk3wydrs3`
      },
      {
        key: `source-validator`,
        value: `cosmosvaloper18ymm350peujvq2xy9ymyqj4v34ekvnk3tsekuz`
      }
    ],
    tx: {
      type: `auth/StdTx`,
      value: {
        msg: [
          {
            type: `color/MsgSetWithdrawAddress`,
            value: {
              withdraw_address: `cosmos18ymm350peujvq2xy9ymyqj4v34ekvnk3wydrs3`
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        signatures: [
          {
            pub_key: {
              type: `tendermint/PubKeySecp256k1`,
              value: `A0ANSrO/dQgW/kgtMZam5DBC4De7V3PvQt6RyuK2dfhI`
            },
            signature: `RDq6lowz7Oo/dK8h686qzobzs0rI2nFrd3bHEf1P34wPYx56XXG4KysPt52B0f34I4C5bluXU5+scKtyRNTyGQ==`
          }
        ],
        memo: `TESTING (Sent via Color Wallet)`
      }
    }
  },
  {
    height: `1114`,
    txhash: `not a real hash 14`,
    log: `[{"msg_index":"0","success":true,"log":""}]`,
    gas_wanted: `500000`,
    gas_used: `58806`,
    time: new Date(43300).toISOString(), // set by Color Wallet
    tags: [
      {
        key: `action`,
        value: `withdraw_validator_rewards_all`
      },
      {
        key: `delegator`,
        value: `cosmos18ymm350peujvq2xy9ymyqj4v34ekvnk3wydrs3`
      },
      {
        key: `source-validator`,
        value: `cosmosvaloper18ymm350peujvq2xy9ymyqj4v34ekvnk3tsekuz`
      }
    ],
    tx: {
      type: `auth/StdTx`,
      value: {
        msg: [
          {
            type: `color/MsgWithdrawValidatorCommission`,
            value: {
              validator_address: `cosmos18ymm350peujvq2xy9ymyqj4v34ekvnk3wydrs3`
            }
          }
        ],
        fee: {
          amount: [{ amount: `3421`, denom: `uclr` }],
          gas: `500000`
        },
        memo: `TESTING (Sent via Color Wallet)`
      }
    }
  }
]
export const allTxs = bankTxs.concat(stakingTxs, governanceTxs, distributionTxs)
