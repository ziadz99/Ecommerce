import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../components/Client";

export const fetchCategories = createAsyncThunk(
  "clothes/fetchCategories",
  async () => {
    const { data, error } = await supabase.from("Category").select("*");

    if (error) {
      throw new Error("Could not fetch the categories");
    }
    return data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: categoriesReducer } = categorySlice;
export default categorySlice;
