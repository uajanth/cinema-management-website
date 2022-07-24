import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isVisible: false,
	type: "",
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		showModal: (state, action) => {
			state.isVisible = true;
			state.type = action.payload.type;
		},
		hideModal: (state) => {
			state.isVisible = false;
			state.type = "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
