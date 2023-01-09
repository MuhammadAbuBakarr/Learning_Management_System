import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// classList: [],
	// teacherList: [],
	// subjectList: [],
};

export const listSlice = createSlice({
	name: "list",
	initialState,
	reducers: {
		saveClass: (state, { payload }) => {
			const classes = payload.map((e) => ({
				label: e.name,
				value: e._id,
			}));
			const classesLabels = payload.map((e) => ({
				label: e.name,
				value: e.name,
			}));
			state.classList = [...classes];
			state.classListLabels = [...classesLabels];
		},
		saveSubject: (state, { payload }) => {
			const subjects = payload.map((e) => ({
				label: e.name,
				value: e._id,
			}));
			const subjectsLabels = payload.map((e) => ({
				label: e.name,
				value: e.name,
			}));
			state.subjectList = [...subjects];
			state.subjectListLabels = [...subjectsLabels];
		},
		saveTeacher: (state, { payload }) => {
			const teachers = payload.map((e) => ({
				label: e.name,
				value: e._id,
			}));
			const teachersLabels = payload.map((e) => ({
				label: e.name,
				value: e.name,
			}));
			state.teacherList = [...teachers];
			state.teacherListLabels = [...teachersLabels];
		},
	},
});
export const { saveClass, saveSubject, saveTeacher } = listSlice.actions;
export default listSlice.reducer;
