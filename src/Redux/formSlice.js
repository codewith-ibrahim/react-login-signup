import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cmpID: "",
  cmpName: "",
  cmpAddress: "",
  cmpEmail: "",
  cmpContact: "",
  cmpImage: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
