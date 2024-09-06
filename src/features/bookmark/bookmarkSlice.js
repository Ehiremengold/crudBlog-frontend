import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUrl } from "../../utils";

const initialState = {
  bookmarks: [],
  isError: false,
  isLoading: false,
};

export const bookmarkPost = createAsyncThunk(
  "bookmark/bookmarkPost",
  async ({ slug, isBookmarked }, thunkAPI) => {
    const access = thunkAPI.getState().login.accessToken;
    try {
      const resp = await axios.post(`${getUrl()}bookmark/post/${slug}/`, null, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      return { slug, action: isBookmarked ? "unBookmark" : "bookmark" };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    bookmark: (state, { payload }) => {
      state.bookmarks.push(payload);
      // payload
    },
    unBookmark: (state, { payload }) => {
      state.bookmarks = state.bookmarks.filter((slug) => slug !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookmarkPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookmarkPost.fulfilled, (state, { payload }) => {
        if (payload.action === "bookmark") {
          state.bookmarks.push(payload.slug);
        } else {
          state.bookmarks = state.bookmarks.filter(
            (slug) => slug !== payload.slug
          );
        }
        state.isLoading = false;
      })
      .addCase(bookmarkPost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        console.log(payload);
      });
  },
});

export const { bookmark, unBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
