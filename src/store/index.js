import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./slices/accountSlice";
import { supabase } from "../components/Client";
import clothesSlice from "./thunks/fetchClothes";
import womenClothesSlice from "./thunks/fetchWomenClothes";
import categorySlice from "./thunks/fetchCategories";
import subCategorySlice from "./thunks/fetchSubCategories";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    clothes: clothesSlice.reducer,
    women: womenClothesSlice.reducer,
    category: categorySlice.reducer,
    subCategory: subCategorySlice.reducer,
  },
});

export default store;
export const getSupabase = () => supabase;
