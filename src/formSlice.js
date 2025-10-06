import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    company: "",
    email: "",
    contact: "",
    address: "",
    image: null
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        updateField: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        resetForm: () => initialState,
    },
});

export const { updateField, resetForm} = formSlice.actions
export default formSlice.reducer;