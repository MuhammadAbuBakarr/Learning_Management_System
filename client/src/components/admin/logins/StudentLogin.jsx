import React from "react";
import { Button, Form, Input, Col, Row, Layout, message } from "antd";
import { Typography } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { savelogin } from "../../../redux/userSlice";
const StudentLogin = () => {
	const dispatch = useDispatch();
	const { Title } = Typography;
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();

	const screenMessage = (type, message) => {
		messageApi.open({
			type: type,
			content: message,
		});
	};

	const handleSubmit = async (val) => {
		try {
			const { status, data } = await axios.post("/login", val);
			if (status === 200) {
				dispatch(savelogin(data));
				console.log(data);
				form.resetFields();
				screenMessage("success", "Login In Successfull");
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
						<Title className="grid place-items-center">
							Login for Students
						</Title>
						<Form
							form={form}
							autoComplete="off"
							name="studentLogin"
							onFinish={handleSubmit}
						>
							<Form.Item
								name="rollNumber"
								rules={[
									{ required: true, message: "Please Enter Your Roll Number" },
								]}
							>
								<Input placeholder="Enter Your Roll Number" />
							</Form.Item>

							<Form.Item
								name="password"
								rules={[
									{ required: true, message: "Please Enter Your Password" },
								]}
							>
								<Input.Password placeholder="Enter Your Password" />
							</Form.Item>
							<Form.Item className="flex justify-center items-center">
								<Button
									type="primary"
									shape="round"
									style={{ width: 300 }}
									size="large"
									htmlType="submit"
								>
									Login
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Layout>
		</>
	);
};

export default StudentLogin;
