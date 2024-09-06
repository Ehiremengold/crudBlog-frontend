import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUrl } from "../../../utils";

const initialState = {
  isLoading: false,
  isError: false,
  posts: [],
  username: "",
  email: "",
};

export const getUserProfile = createAsyncThunk(
  "profile/getProfileUser",
  async (username, thunkAPI) => {
    const url = `${getUrl()}/api/${username}/`;
    try {
      const response = await axios(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        const { email } = payload;
        state.isLoading = false;
        state.email = email;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.isError = true;
        console.log(payload);
      });
  },
});

export default profileSlice.reducer;
