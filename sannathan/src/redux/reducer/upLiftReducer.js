import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  additionalData: [
    {
      id: "25",
      prescription: "name",
      usage: "use",
      suggestion: "suggestionText",
      description: "suggestionUsageText",
      diagnosis: "diagnosis",

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
