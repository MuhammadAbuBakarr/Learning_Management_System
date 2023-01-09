import React, { useEffect } from "react";
import { saveClass, saveSubject, saveTeacher } from "../../redux/listSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const GettingAllLists = () => {
	const dispatch = useDispatch();
	const getSubjects = async () => {
		const { data, status } = await axios.get("/subject?subject=select");
		if (status === 201) {
			dispatch(saveSubject(data));
		}
	};

	const getTeachers = async () => {
		const { data, status } = await axios.get("/admin?teacher=select");
		if (status === 201) {
			dispatch(saveTeacher(data));
		}
	};
	const getClasses = async () => {
		const { data, status } = await axios.get("/class?class=select");
		if (status === 201) {
			dispatch(saveClass(data));
		}
	};

	useEffect(() => {
		getClasses();
		getSubjects();
		getTeachers();
	}, []);

	return;
};

export default GettingAllLists;
