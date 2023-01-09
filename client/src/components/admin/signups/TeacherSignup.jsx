import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Col, Row, Layout, message } from "antd";
import axios from "axios";
const TeacherSignup = () => {
	const [classes, setclasses] = useState([]);
	const [subjects, setsubjects] = useState([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();

	const screenMessage = (type, message) => {
		messageApi.open({
			type: type,
			content: message,
		});
	};

	const optionsForClasses = classes.map((e) => ({
		label: e.name,
		value: e._id,
	}));
	const optionsForSubjects = subjects.map((e) => ({
		label: e.name,
		value: e._id,
	}));
	// Making Classes Options
	const getClasses = async () => {
		const { data, status } = await axios.get("/class?class=select");
		if (status === 201) {
			setclasses(data);
		}
	};
	// Making Subjects Options
	const getSubjects = async () => {
		const { data, status } = await axios.get("/subject?subject=select");
		if (status === 201) {
			setsubjects(data);
		}
	};
	// Submitting Form Data
	const postingFormData = async (values) => {
		const keys = Object.keys(values);
		keys.forEach((key) => {
			if (!values[key] || values[key].length === 0) {
				delete values[key];
			}
		});
		const { role } = values;
		if (!role) {
			values.role = "teacher";
		}

		try {
			const { status, data } = await axios.post("/admin", values);
			if (status === 201) {
				form.resetFields();
				screenMessage("success", data.message);
			}
		} catch (e) {
			const errortext = e.response.data.message;
			screenMessage("error", errortext);
		}
	};
	useEffect(() => {
		getClasses();
		getSubjects();
	}, []);

	return (
		<>
			{contextHolder}
			<Layout style={{ width: 600 }}>
				<Row
					align={"middle"}
					style={{ border: "2px solid green" }}
					justify="center"
				>
					<Col span={8} justify="center">
						<div className="grid bg- place-items-center text-2xl p-3 ">
							Teacher Signup Form
						</div>
						<Form
							form={form}
							name="basic"
							onFinish={postingFormData}
							autoComplete="off"
						>
							<Form.Item
								name="name"
								rules={[
									{
										required: true,
										message: "Please input your username!",
									},
								]}
							>
								<Input placeholder="Enter Your Name" />
							</Form.Item>

							<Form.Item
								name="password"
								hasFeedback
								rules={[
									{
										required: true,
										message: "Please Enter your password!",
									},
								]}
							>
								<Input.Password placeholder="Enter Your password" />
							</Form.Item>
							<Form.Item
								hasFeedback
								dependencies={["password"]}
								name="cpassword"
								rules={[
									{
										required: true,
										message: "Please Enter your password!",
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue("password") === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error(
													"The two passwords that you entered do not match!"
												)
											);
										},
									}),
								]}
							>
								<Input.Password placeholder="Confrim Your password" />
							</Form.Item>
							<Form.Item
								name="role"
								hasFeedback
								rules={[
									{
										required: false,
									},
									() => ({
										validator(_, value) {
											if (!value) {
												value = "teacher";
												return Promise.resolve();
											} else if (value === "admin") {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error("Admin Key is Not correct")
											);
										},
									}),
								]}
							>
								<Input placeholder="Enter Your Role" />
							</Form.Item>
							<Form.Item
								name="classes"
								rules={[
									{
										required: false,
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
									placeholder="Select Classes"
									allowClear
									mode="multiple"
									options={optionsForClasses}
								/>
							</Form.Item>
							<Form.Item
								name="subjects"
								rules={[
									{
										required: false,
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
									placeholder="Select Subjects"
									allowClear
									mode="multiple"
									options={optionsForSubjects}
								/>
							</Form.Item>

							<Form.Item className="flex justify-center items-center">
								<Button
									type="primary"
									shape="round"
									style={{ width: 300 }}
									size="large"
									htmlType="submit"
								>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Layout>
		</>
	);
};

export default TeacherSignup;
