/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  account: null,
  errorMsg: '',
};

const Blockchain = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    updateAccount: (state, { payload }) => {
      console.log('updating account', payload.account);
      state.account = payload.account;
    },
    resetBlockchainState: () => initialState,
  },
});

export const {
  updateAccount,
  resetBlockchainState,
} = Blockchain.actions;

export default Blockchain.reducer;
