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

const CreateSubject = () => {
	const { Title } = Typography;
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();
	const [teachers, setteachers] = useState([]);

	const screenMessage = (type, message) => {
		messageApi.open({
			type: type,
			content: message,
		});
	};

	const optionsForTeachers = teachers.map((e) => ({
		label: e.name,
		value: e._id,
	}));
	const getTeachers = async () => {
		const { data, status } = await axios.get("/admin?teacher=select");
		if (status === 201) {
			setteachers(data);
		}
	};

	useEffect(() => {
		getTeachers();
	}, []);
	const handleSubmit = async (values) => {
		const keys = Object.keys(values);
		keys.forEach((key) => {
			if (!values[key] || values[key].length === 0) {
				delete values[key];
			}
		});

		try {
			const { data, status } = await axios.post("/subject", values);
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
						<Title className="grid place-items-center">Add New Subject</Title>
						<Form
							form={form}
							autoComplete="off"
							name="createSubject"
							onFinish={handleSubmit}
						>
							<Form.Item
								name="name"
								rules={[
									{ required: true, message: "Please Enter Subject Name" },
								]}
							>
								<Input placeholder="Enter Subject Name" />
							</Form.Item>

							<Form.Item
								name="teachers"
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
									placeholder="Select Teachers"
									allowClear
									mode="multiple"
									options={optionsForTeachers}
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

export default CreateSubject;
