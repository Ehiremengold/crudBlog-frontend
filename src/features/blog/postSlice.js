import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUrl } from "../../utils";

const initialState = {
  isSuccessful: false,
  isLoading: false,
  isError: false,
  posts: [],
  popularPosts: [],
  postDetail: [],
};

// CREATE
export const sendPost = createAsyncThunk(
  "post/sendPost",
  async (postObj, thunkAPI) => {
    const access = thunkAPI.getState().login.accessToken;
    try {
      const response = await axios.post(
        `${getUrl()}/api/post/create/`,
        postObj,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// READ
export const retrievePost = createAsyncThunk(
  "post/retrievePost",
  async (postSlug, thunkAPI) => {
    try {
      const response = await axios(`${getUrl()}/api/post/${postSlug}/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios(`${getUrl()}/api/posts/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getPopularPost = createAsyncThunk(
  "post/getPopularPosts",
  async (_, thunkAPI) => {
    try {
      const resp = await axios(`${getUrl()}/api/popular/posts/`);
      console.log(`${getUrl()}/api/popular/posts/`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// UPDATE
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postSlug, updatePostObj }, thunkAPI) => {
    const access = thunkAPI.getState().login.accessToken;
    try {
      const response = await axios.patch(
        `${getUrl()}/api/post/${postSlug}/`,
        updatePostObj,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// DELETE
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postSlug, thunkAPI) => {
    const access = thunkAPI.getState().login.accessToken;
    try {
      const response = await axios.delete(`${getUrl()}/api/post/${postSlug}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    toggleSuccessState: (state) => {
      state.isSuccessful = false; //  changes state.isSuccessful after sending post.
    },
    resetErrorState: (state) => {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(sendPost.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccessful = true;
      })
      .addCase(sendPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccessful = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(getPopularPost.pending, (state) => {
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(getPopularPost.fulfilled, (state, { payload }) => {
        state.popularPosts = payload;
        state.isLoading = false;
      })
      .addCase(getPopularPost.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(retrievePost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(retrievePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetail = action.payload;
      })
      .addCase(retrievePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccessful = true;
      })
      .addCase(updatePost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessful = true;
        state.posts = state.posts.filter(
          (post) => post.slug !== action.payload.slug
        );
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
        state.isSuccessful = false;
        state.isError = true;
      });
  },
});

export default postSlice.reducer;

export const { toggleSuccessState, resetErrorState } = postSlice.actions;
