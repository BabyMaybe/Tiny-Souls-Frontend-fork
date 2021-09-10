/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const getEthereumAccount = async () => window.ethereum.request({
  method: 'eth_requestAccounts',
});

const getEthereumNetworkId = async () => window.ethereum.request({
  method: 'net_version',
});

// TODO: Provide Network and Metamask feedback
// INFO: Probably do that in the frontend
export const useContract = (contractABI, contractAddress, network) => {
  const [web3, setWeb3] = useState();
  const [smartContract, setSmartContract] = useState();
  const { ethereum } = window;

  useEffect(async () => {
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (!metamaskIsInstalled) return;

    const w3 = new Web3(ethereum);
    setWeb3(w3);

    const networkId = await getEthereumNetworkId();

    // TODO: Pass this in as arg
    if (networkId === network) {
      const contract = new w3.eth.Contract(
        contractABI,
        contractAddress,
      );
      setSmartContract(contract);
    }

    ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }, [window.ethereum]);

  return [smartContract, web3];
};

export const useMetamaskAccount = () => {
  const [account, setAccount] = useState();

  const { ethereum } = window;
  const metamaskIsInstalled = ethereum && ethereum.isMetaMask;

  useEffect(async () => {
    if (metamaskIsInstalled) {
      const ethAccounts = await getEthereumAccount();
      setAccount(ethAccounts[0]);

      ethereum.on('accountsChanged', (newAccounts) => {
        setAccount(newAccounts[0]);
      });
    }
  }, [window.ethereum]);

  return account;
};

export const ETH_NETWORK_IDS = {
  MAINNET: '1',
  ROPSTEN: '3',
  RINKEBY: '4',
  GORELI: '5',
  DEV: '2018',
};
