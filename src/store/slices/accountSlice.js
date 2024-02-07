import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSupabase } from "..";

const initialState = {
  token: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "account/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user, error } = await getSupabase().auth.signIn({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("account/logout", async () => {
  await getSupabase().auth.signOut();
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      });
  },
});

export const accountReducer = accountSlice.reducer;
