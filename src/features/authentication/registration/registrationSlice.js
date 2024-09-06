import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: "",
  email: "",
  accessToken: "",
  isLoading: true,
  isError: false,
};

const url = "";

export const register = createAsyncThunk(
  "auth/register",
  async (signUpData, thunkAPI) => {
    try {
      const resp = await axios.post(url, JSON.stringify(signUpData));
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    // logout: (state) => {
    //   return state;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      });
  },
});

// export const { logout } = registerSlice.actions;

export default registerSlice.reducer;
