import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isVisible: false,
	type: "",
	info: {},
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		showModal: (state, action) => {
			state.isVisible = true;
			state.type = action.payload.type;
			state.info = action.payload.info;
		},
		hideModal: (state) => {
			state.isVisible = false;
			state.type = "";
			state.info = {};
		},
	},
});

// Action creators are generated for each case reducer function
export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
