import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Button,
	Select,
	Form,
	Input,
	Col,
	Row,
	Layout,
	message,
	Typography,
} from "antd";

const CreateClass = () => {
	const { Title } = Typography;
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();
	const [subjects, setsubjects] = useState([]);
	const screenMessage = (type, message) => {
		messageApi.open({
			type: type,
			content: message,
		});
	};

	const optionsForSubjects = subjects.map((e) => ({
		label: e.name,
		value: e._id,
	}));
	console.log(optionsForSubjects);
	const getSubjects = async () => {
		const { data, status } = await axios.get("/subject?subject=select");
		if (status === 201) {
			setsubjects(data);
		}
	};

	useEffect(() => {
		getSubjects();
	}, []);
	const handleSubmit = async (values) => {
		const keys = Object.keys(values);
		keys.forEach((key) => {
			if (!values[key] || values[key].length === 0) {
				delete values[key];
			}
		});

		try {
			const { data, status } = await axios.post("/class", values);
			if (status === 201) {
				form.resetFields();
				screenMessage("success", data.message);
			}
		} catch (e) {
			console.log(e);
			screenMessage("error", e.response.data.message);
		}
	};
	return (
		<>
			{contextHolder}
			<Layout>
				<Row align={"middle"} justify="center" style={{ height: "100vh" }}>
					<Col
						style={{
							width: "600px",
							marginTop: "-150px",
							padding: "50px",
							borderRadius: "20px",
							backgroundColor: "rgb(203, 213, 225)",
						}}
					>
						<Title className="grid place-items-center">Add New Class</Title>
						<Form
							form={form}
							autoComplete="off"
							name="createClass"
							onFinish={handleSubmit}
						>
							<Form.Item
								name="name"
								rules={[{ required: true, message: "Please Enter Class Name" }]}
							>
								<Input placeholder="Enter Class Name" />
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

export default CreateClass;
