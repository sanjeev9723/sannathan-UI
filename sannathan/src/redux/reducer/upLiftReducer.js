import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  additionalData: [
    {
      id: "",
      prescription: "",
      usage: "",
      suggestion: "",
      description: "",
      diagnosis: "",
    },
  ],
};

export const upLiftReducer = createSlice({
  name: "upLift",
  initialState,
  reducers: {
    addAdditionalDetails: (state, action) => {
      let orders = [...state.additionalData];
      orders.push(action.payload);
      state.additionalData = orders;
    },
    emptyAdditionalDetails: (state) => {
      state.additionalData = [];
    },
  },
});

export const { addAdditionalDetails, emptyAdditionalDetails } =
  upLiftReducer.actions;

export default upLiftReducer.reducer;
