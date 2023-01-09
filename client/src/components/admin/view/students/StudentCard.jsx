import React from "react";
import { Button } from "antd";

const StudentCard = ({ props }) => {
	const { subjects } = props;
	const SubjectsDivs = subjects.map((e, i) => <div key={i}>{e.name}</div>);
	return (
		<>
			<div className="bg-slate-100 shadow-xl gap-2 p-4 rounded-2xl flex flex-col justify-center items-center ">
				<div className="flex flex-col gap-2">
					<div>
						<span className="font-bold mx-2">Name:</span>
						{props.name}
					</div>
					<div>
						<span className="font-bold mx-2">Father Name:</span>
						{props.fatherName}
					</div>
					<div>
						<span className="font-bold mx-2">Roll Number:</span>
						{props.rollNumber}
					</div>
					<div>
						<span className="font-bold mx-2">Class:</span>
						{props.class.name}
					</div>
					<div className="flex">
						<span className="font-bold mx-2">Subjects:</span>
						<div className="flex gap-2">{SubjectsDivs}</div>
					</div>
				</div>
				<div>
					<Button>Edit</Button>
				</div>
			</div>
		</>
	);
};

export default StudentCard;
