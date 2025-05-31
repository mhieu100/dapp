import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { callLogin } from '../../config/api.auth';

export const fetchAccount = createAsyncThunk(
  'account/fetchAccount',
  async (address) => {
    try {
      const response = await callLogin(address);
    return response.data;
    } catch (error) {
      console.error('Error fetching account:', error);
    }
    
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    walletAddress: '',
    email: '',
    fullname: '',
    address: '',
    phone: '',
    birthday: '',
    centerName: '',
    roleName: '',
  },
  activeMenu: 'home',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user.walletAddress = action?.payload?.walletAddress;
      state.user.email = action.payload.email;
      state.user.centerName = action.payload.centerName;
      state.user.fullname = action.payload.fullname;
      state.user.address = action.payload.address;
      state.user.phone = action.payload.phoneNumber;
      state.user.birthday = action.payload.birthday;
      state.user.roleName = action?.payload?.roleName;
    },
    setLogoutAction: (state) => {
      state.isAuthenticated = false;
      state.user = {
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccount.pending, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = true;
      }
    });

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user.walletAddress = action?.payload?.user?.walletAddress;
        state.user.email = action.payload.user?.email;
        state.user.fullname = action.payload.user?.fullname;
        state.user.centerName = action.payload.user?.centerName;
        state.user.address = action.payload.user?.address;
        state.user.phone = action.payload.user?.phoneNumber;
        state.user.birthday = action.payload.user?.birthday;
        state.user.roleName = action?.payload?.user?.roleName;
      }
    });

    builder.addCase(fetchAccount.rejected, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = false;
      }
    });
  },
});

export const {
  setActiveMenu,
  setUserLoginInfo,
  setLogoutAction,
} = accountSlice.actions;

export default accountSlice.reducer;
