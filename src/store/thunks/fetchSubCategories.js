import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../components/Client";

export const fetchSubCategories = createAsyncThunk(
  "clothes/fetchSubCategories",
  async (catId) => {
    const { data, error } = await supabase
      .from("SubCategory")
      .select("*")
      .eq("category", catId);

    if (error) {
      throw new Error("Could not fetch the Subcategories");
    }
    return data;
  }
);

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: subCategoriesReducer } = subCategorySlice;
export default subCategorySlice;
