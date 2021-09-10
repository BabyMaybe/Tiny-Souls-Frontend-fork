/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import contract from './config/contract.config';

import { checkData } from './redux/data/data.slice';

import { useContract, useMetamaskAccount, ETH_NETWORK_IDS } from './hooks/customWeb3Hooks';

// TODO: MOVED METAMASK CHECK HANDLING IN HERE
// BUG: checkData fails after minting - fix that
function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const [smartContract, web3, error] = useContract(contract.abi, contract.address, ETH_NETWORK_IDS.RINKEBY);
  const account = useMetamaskAccount();

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    console.log(`minting to ${account}`);

    setFeedback('Minting your SQUARE...');
    setClaimingNft(true);

    smartContract.methods
      .mint(account, _amount)
      .send({
        // TODO: figure out default gas limit?
        gasLimit: '285000',
        to: contract.address,
        from: account,
        value: web3.utils.toWei(
          ((Number(data.cost) / 1e18) * _amount).toString(),
          'ether',
        ),
      })
      .once('error', (err) => {
        console.log(err);
        setFeedback('Sorry, something went wrong please try again later.');
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          'WOW, you now own a SQUARE. go visit Opensea.io to view it.',
        );
        setClaimingNft(false);
        dispatch(checkData(account));
      });
  };

  useEffect(() => {
    console.log('smart contract or account or dispatch changed');

    if (account && smartContract) {
      console.log(`dispatching check data with contract: ${smartContract}`);
      dispatch(checkData(smartContract));
    }
  }, [smartContract, account, dispatch]);

  return (
    <div>
      {account === ''
        || smartContract === null
        ? (<h1>CONNECT YOUR SHIT</h1>)
        : null}

      <div>

        <h1>
          Mint a Square
        </h1>

        <div>
          <h1>
            {data.totalSupply}
            /100
          </h1>

          {Number(data.totalSupply) === 100 ? (
            <>
              <h1>
                The sale has ended.
              </h1>

              <h2>
                You can still find SQUAREs on
                {' '}
                <a
                  target="_blank"
                  href="https://opensea.io/collection/SQUAREs"
                  rel="noreferrer"
                >
                  Opensea.io
                </a>
              </h2>
            </>
          ) : (
            <>
              <h1>
                1 Square costs
                {' '}
                {data.cost / 1e18}
                {' '}
                ETH.
              </h1>

              <h2>
                Excluding gas fee.
              </h2>

              <h2>
                {feedback}
              </h2>

              <div>
                <button
                  type="button"
                  disabled={claimingNft ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    claimNFTs(1);
                  }}
                >
                  {claimingNft ? 'BUSY' : 'BUY 1'}
                </button>
              </div>
              <div>
                <h2>
                  Please make sure you are connected to the right network
                  (Rinkeby) and the correct address. Please note:
                  Once you make the purchase, you cannot undo this action.
                </h2>

                <h2>
                  We have set the gas limit to 285000 for the contract to
                  successfully mint your NFT. We recommend that you don't
                  change the gas limit.
                </h2>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
