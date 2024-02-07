import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../components/Client";

// Define the async thunk
export const fetchWomenClothes = createAsyncThunk(
  "clothes/fetchClothes",
  async () => {
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .eq("Target", "women");

    if (error) {
      throw new Error("Could not fetch the clothes");
    }
    return data;
  }
);

// Define the slice
const womenClothesSlice = createSlice({
  name: "women",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWomenClothes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWomenClothes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWomenClothes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export const { reducer: clothesReducer } = womenClothesSlice;
export default womenClothesSlice;
