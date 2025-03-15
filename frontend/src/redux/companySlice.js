import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleComapny: null,
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleComapny = action.payload;
    },
  },
});

export const { setSingleCompany } = companySlice.actions;
export default companySlice.reducer;
