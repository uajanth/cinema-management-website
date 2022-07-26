import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	seatsSelected: [],
};

export const seatSlice = createSlice({
	name: "seat",
	initialState,
	reducers: {
		addSeat: (state, action) => {
			state.seatsSelected.push(action.payload.seat);
			state.seatsSelected = state.seatsSelected;
		},
		removeSeat: (state, action) => {
			const existingIndex = state.seatsSelected.indexOf(action.payload.seat);
			state.seatsSelected.splice(existingIndex, 1);
			state.seatsSelected = state.seatsSelected;
		},
		resetSeats: (state) => {
			state.seatsSelected = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { addSeat, removeSeat } = seatSlice.actions;

export default seatSlice.reducer;
