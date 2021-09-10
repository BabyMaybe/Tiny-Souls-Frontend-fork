/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  name: '',
  totalSupply: 0,
  cost: 0,
  error: false,
  errorMsg: '',
};

export const checkData = createAsyncThunk(
  'data/checkData',
  async (smartContract, thunkAPI) => {
    console.log('checking data!');
    console.log('smartContract', smartContract);

    thunkAPI.dispatch(resetDataState());

    const { methods } = smartContract;
    const name = await methods.name().call();
    const totalSupply = await methods.totalSupply().call();
    const cost = await methods.cost().call();

    return {
      name,
      totalSupply,
      cost,
    };
  },
);

const Data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetDataState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(checkData.pending, (state) => {
      console.log('starting data check');
      state.loading = true;
    });
    builder.addCase(checkData.fulfilled, (state, { payload }) => {
      console.log('fulfilled data check');
      state.loading = false;
      state.name = payload.name;
      state.totalSupply = payload.totalSupply;
      state.cost = payload.cost;
    });
    builder.addCase(checkData.rejected, (state, { error }) => {
      console.log('errored data check');
      console.error(error);
      state.loading = false;
      state.error = true;
      state.errorMsg = error;
    });
  },
});

export const {
  resetDataState,
} = Data.actions;

export default Data.reducer;
