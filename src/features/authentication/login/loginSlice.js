import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUrl } from "../../../utils";

const initialState = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  username: "",
  email: "",
  isLoading: false,
  isError: false,
  errorMsg: "",
};

const url = `${getUrl()}/api/token/`;

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const resp = await axios.post(url, loginData);
      // console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      return { ...initialState };
    },
    setIsError: (state) => {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { access, refresh, username, email } = payload;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.username = username;
        state.email = email;
        state.accessToken = access;
        state.refreshToken = refresh;
        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.payload.detail;
      });
  },
});

// import { logout } from "./features/authentication/login/loginSlice.js";

export const { logout, setIsError } = loginSlice.actions;

export default loginSlice.reducer;
