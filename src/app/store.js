import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import ticketReducer from "./ticketSlice";

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		ticket: ticketReducer,
	},
});
