import { createSlice } from "@reduxjs/toolkit";

const medicineSlice = createSlice({
  name: "medicine",
  initialState: {
    medicine: JSON.parse(localStorage.getItem("medicine")) || [],
  },
  reducers: {
    //AddItem function to add medicines according to condition
    addItem: (state, action) => {
      if (state.medicine.length < 5) {
        state.medicine.push(action.payload);
        localStorage.setItem("medicine", JSON.stringify(state.medicine));
      } else {
        alert("You can add only upto 5 medicines!!");
      }
    },

    //Delete med Function
    removeItem: (state, action) => {
      state.medicine = state.medicine.filter(
        (med) => med.id !== action.payload
      );
      localStorage.setItem("medicine", JSON.stringify(state.medicine));
    },

    // Edit function for updating the medicine data
    editItem: (state, action) => {
      const index = state.medicine.findIndex(
        (med) => med.id === action.payload.id
      );
      if (index !== -1) {
        // Update the medicine at the found index with the new data
        state.medicine[index] = { ...state.medicine[index], ...action.payload };
        localStorage.setItem("medicine", JSON.stringify(state.medicine));
      }
    },
  },
});

export const { addItem, removeItem, editItem } = medicineSlice.actions;

export default medicineSlice.reducer;
