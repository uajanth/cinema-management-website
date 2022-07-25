import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	totalTickets: 0,
	ticketsByGroup: [
		{ price: 15, name: "General", quantity: 0 },
		{ price: 10, name: "Child", quantity: 0 },
		{ price: 10, name: "Senior", quantity: 0 },
	],
};

export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	reducers: {
		increment: (state, action) => {
			state.totalTickets = state.totalTickets + 1;
			switch (action.payload.name) {
				case "General":
					state.ticketsByGroup[0].quantity =
						state.ticketsByGroup[0].quantity + 1;
					break;

				case "Child":
					state.ticketsByGroup[1].quantity =
						state.ticketsByGroup[1].quantity + 1;
					break;

				case "Senior":
					state.ticketsByGroup[2].quantity =
						state.ticketsByGroup[2].quantity + 1;
					break;
				default:
					break;
			}
		},
		decrement: (state, action) => {
			if (state.totalTickets != 0) {
				state.totalTickets = state.totalTickets - 1;
				switch (action.payload.name) {
					case "General":
						state.ticketsByGroup[0].quantity =
							state.ticketsByGroup[0].quantity - 1;
						break;

					case "Child":
						state.ticketsByGroup[1].quantity =
							state.ticketsByGroup[1].quantity - 1;
						break;

					case "Senior":
						state.ticketsByGroup[2].quantity =
							state.ticketsByGroup[2].quantity - 1;
						break;
					default:
						break;
				}
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = ticketSlice.actions;

export default ticketSlice.reducer;
