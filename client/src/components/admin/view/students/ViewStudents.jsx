import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { Button, Form, Select } from "antd";

const ViewStudents = () => {
	const [students, setstudents] = useState([]);
	const getStudents = async () => {
		const { data, status } = await axios.get("/student");
		if (status === 201) {
			setstudents(data.students);
		}
	};
	const StudentsCardMapping = students.map((e, i) => (
		<StudentCard props={e} key={i} />
	));

	useEffect(() => {
		getStudents();
	}, []);

	return (
		<>
			<div className="flex flex-col">
				<div className="flex justify-center flex-wrap gap-10 py-10">
					{StudentsCardMapping}
				</div>
			</div>
		</>
	);
};

export default ViewStudents;
