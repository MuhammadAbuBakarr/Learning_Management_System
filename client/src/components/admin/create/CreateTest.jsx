import React, { useState } from "react";
import { Button, Select, Form, DatePicker, Input, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import GettingAllLists from "../../services/GettingAllLists";
import TestInputFields from "./TestInputFields";
const CreateTest = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();

	const screenMessage = (type, message) => {
		messageApi.open({
			type: type,
			content: message,
		});
	};
	const [students, setstudents] = useState([]);
	const [temp, settemp] = useState([]);

	const lists = useSelector((s) => s.listReducer);
	console.log(lists);
	const { classListLabels, subjectListLabels, teacherListLabels } = lists;

	const studentHandler = (obj) => {
		const temp1 = [...temp];
		const update = temp1.find((item) => item.rollNumber === obj.rollNumber);
		const index = temp1.indexOf(update);
		temp1.splice(index, 1, obj);
		settemp(temp1);
	};
	// Mapping Inputs of Students
	const Inputs = students.map((e, i) => {
		const rollNumber = e.rollNumber;
		const name = e.name;
		const Class = e.class.name;
		return (
			<TestInputFields
				key={i}
				props={{ Class, name, rollNumber, studentHandler }}
			/>
		);
	});
	// Fetching Students by Class
	const getStudents = async (Class) => {
		const { status, data } = await axios.get(`/student?class=${Class}`);
		if (status === 201) {
			const numberofStudents = data.students;
			setstudents(data.students);
			var arr = [];
			for (let i = 0; i < numberofStudents.length; i++) {
				const { rollNumber } = numberofStudents[i];
				const obj = { rollNumber: rollNumber };
				arr.push(obj);
			}
			settemp(arr);
		}
	};
	// Fetch Students by Class Change
	const fetchbyClassesChange = (e) => {
		getStudents(e);
	};

	const handleSubmit = async (values) => {
		const payload = {
			...values,
			totalMarks: Number(values.totalMarks),
			date: values.date.format("YYYY-MM-DD"),
			studentResults: temp,
		};
		console.log(payload);

		try {
			const { data, status } = await axios.post("/test", payload);
			if (status === 201) {
				screenMessage("success", data.message);
				form.resetFields();
				setstudents([]);
			}
		} catch (e) {
			console.log(e);
			screenMessage("error", e.response.data.message);
		}
	};

	return (
		<>
			{contextHolder}
			<div className="flex flex-col w-full">
				<h1 className="font-thin mt-6 text-4xl grid place-items-center">
					Upload Test Results
				</h1>
				<div className="mt-10 flex space-x-10 items-center justify-center">
					<Form
						form={form}
						onFinish={handleSubmit}
						autoComplete="off"
						name="createSubject"
					>
						<div className="flex flex-col space-x-4">
							<div className="flex justify-center items-center space-x-5">
								<Form.Item
									className="opacity-100 "
									name="details"
									rules={[{ required: true }]}
								>
									<Input placeholder="Enter Test Details" />
								</Form.Item>
								<Form.Item name="totalMarks" rules={[{ required: true }]}>
									<Input type="number" placeholder="Enter Total Marks" />
								</Form.Item>
							</div>
							<div className="flex space-x-5 justify-center items-center">
								<Form.Item
									style={{ width: 130 }}
									name="Class"
									rules={[
										{
											required: true,
										},
									]}
								>
									<Select
										onChange={fetchbyClassesChange}
										showArrow="true"
										showSearch
										optionFilterProp="children"
										filterOption={(input, option) =>
											(option?.label ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										placeholder="Select Classes"
										allowClear
										options={classListLabels}
									/>
								</Form.Item>
								<Form.Item
									style={{ width: 130 }}
									name="teacher"
									rules={[
										{
											required: true,
										},
									]}
								>
									<Select
										showArrow="true"
										showSearch
										optionFilterProp="children"
										filterOption={(input, option) =>
											(option?.label ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										placeholder="Select Teacher"
										allowClear
										options={teacherListLabels}
									/>
								</Form.Item>
								<Form.Item
									style={{ width: 130 }}
									name="subject"
									rules={[
										{
											required: true,
										},
									]}
								>
									<Select
										showArrow="true"
										showSearch
										optionFilterProp="children"
										filterOption={(input, option) =>
											(option?.label ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										placeholder="Select Subject"
										allowClear
										options={subjectListLabels}
									/>
								</Form.Item>

								<Form.Item
									name="date"
									rules={[
										{
											required: true,
										},
									]}
								>
									<DatePicker />
								</Form.Item>
							</div>
							<div className="">{Inputs}</div>
							<Form.Item className="flex justify-center items-center">
								<Button
									type="primary"
									shape="round"
									style={{ width: 300 }}
									size="large"
									htmlType="submit"
								>
									Upload Test
								</Button>
							</Form.Item>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
};

export default CreateTest;
