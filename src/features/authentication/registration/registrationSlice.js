import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUrl } from "../../../utils";

const initialState = {
  username: "",
  email: "",
  accessToken: "",
  isLoading: true,
  isError: false,
};

//

export const register = createAsyncThunk(
  "auth/register",
  async (signUpData, thunkAPI) => {
    try {
      const resp = await axios.post(`${getUrl()}/api/create-account/`, JSON.stringify(signUpData));
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
