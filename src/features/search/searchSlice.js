import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUrl } from "../../utils";


const initialState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  queryPosts: [],
};

export const getSearchedPosts = createAsyncThunk(
  "search/getPosts",
  async (query, thunkAPI) => {
    try {
      const resp = await axios(`${getUrl()}/api/posts/search/?q=${query}`);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchedPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.queryPosts = action.payload;
      })
      .addCase(getSearchedPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errMsg = action.payload;
      });
  },
});

export default searchSlice.reducer;
