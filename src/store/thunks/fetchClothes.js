import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../components/Client";

// Define the async thunk
export const fetchClothes = createAsyncThunk(
  "clothes/fetchClothes",
  async () => {
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .eq("Target", "men");

    if (error) {
      throw new Error("Could not fetch the clothes");
    }
    return data;
  }
);

// Define the slice
const clothesSlice = createSlice({
  name: "clothes",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClothes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClothes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchClothes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export const { reducer: clothesReducer } = clothesSlice;
export default clothesSlice;
