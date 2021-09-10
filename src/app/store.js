import { configureStore } from '@reduxjs/toolkit';

import blockchainReducer from '../redux/blockchain/blockchain.slice';
import dataReducer from '../redux/data/data.slice';

const store = configureStore({
  reducer: {
    blockchain: blockchainReducer,
    data: dataReducer,
  },
});

export default store;
