import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_RESET_INITIAL_STATE, OTP_SEND_TYPE, USERREGISTER_TYPE, USERLOGIN_TYPE, SET_CUSTOMER } from '../actiontypes';

// Thunk to fetch initial state from AsyncStorage
export const fetchInitialAuthState = createAsyncThunk('auth/fetchInitialAuthState', async () => {
  const customer = await AsyncStorage.getItem('customer');
  return customer ? JSON.parse(customer) : null;
});

const initialState = {
  sendotpdata: [],
  userregisterdata: [],
  logindata: [],
  customer: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetInitialState: (state) => {
      return initialState;
    },
    setOtpSendData: (state, action) => {
      state.sendotpdata = action.payload;
    },
    setUserRegisterData: (state, action) => {
      state.userregisterdata = action.payload;
    },
    setUserLoginData: (state, action) => {
      state.logindata = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
      AsyncStorage.setItem('customer', JSON.stringify(action.payload));
      console.log(action.payload, "dsakfskl")
    },
    clearCustomer: (state) => {
      state.customer = null;
      AsyncStorage.removeItem('customer');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialAuthState.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitialAuthState.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customer = action.payload;
      })
      .addCase(fetchInitialAuthState.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetInitialState, setOtpSendData, setUserRegisterData, setUserLoginData, setCustomer, clearCustomer } = authSlice.actions;

export default authSlice.reducer;
