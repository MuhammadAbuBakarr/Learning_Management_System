import React from "react";

const TestInputFields = ({ props }) => {
	const { name, rollNumber, Class, studentHandler } = props;

	const obj = {
		rollNumber,
		obtainedMarks: 0,
	};

	const handleChange = (e) => {
		obj.obtainedMarks = Number(e.target.value);
		studentHandler(obj);
	};

	return (
		<>
			<div className="flex flex-col">
				<div className="flex  justify-center items-center">
					<div className="w-full bg-slate-200 flex m-4 h-11 p-3 gap-10">
						<div>
							<span className="font-medium">RollNumber: </span> {rollNumber}
						</div>
						<div>
							<span className="font-medium">Name: </span> {name}
						</div>
						<div>
							<span className="font-medium">Class: </span> {Class}
						</div>
					</div>
					<div>
						<input
							onChange={handleChange}
							placeholder="Enter Obtained Marks"
							className=" p-2"
							type="text"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default TestInputFields;
