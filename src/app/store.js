import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import ticketReducer from "./ticketSlice";
import seatReducer from "./seatSlice";

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		ticket: ticketReducer,
		seat: seatReducer,
	},
});
