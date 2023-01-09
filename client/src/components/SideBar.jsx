import React from "react";
import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { myUser } from "../redux/userSlice";
import {
	SettingOutlined,
	SolutionOutlined,
	UploadOutlined,
	FundViewOutlined,
} from "@ant-design/icons";

const SideBar = () => {
	const user = useSelector(myUser);
	const [collapsed, setCollapsed] = useState(false);
	const { Sider } = Layout;
	const nav = useNavigate();
	const handleItem = (e) => {
		nav(e.key);
	};
	const itemsBeforeUser = [
		{ label: "Login as Teacher", key: "/loginTeacher" },
		{ label: "Login as Student", key: "/loginStudent" },
	];
	// Admin Nested Elements
	const Createbtns = [
		{ label: "Create Teacher", key: "/registerTeacher" },
		{ label: "Create Student", key: "/registerStudent" },
		{ label: "Create Class", key: "/createClass" },
		{ label: "Create Subject", key: "/createSubject" },
	];
	const testBtns = [
		{ label: "Upload Test Results", key: "/createTest" },
		{ label: "View Tests", key: "/viewTest" },
	];
	const viewBtns = [{ label: "View Students", key: "/viewStudents" }];

	/// Admin Items
	const adminItems = [
		{
			label: "Create Section",
			key: "1",
			icon: <UploadOutlined />,
			children: Createbtns,
		},
		{
			label: "Test Section",
			key: "2",
			icon: <SolutionOutlined />,
			children: testBtns,
		},
		{
			label: "View Section",
			key: "3",
			icon: <FundViewOutlined />,
			children: viewBtns,
		},
	];

	return (
		<>
			<Sider
				style={{ minHeight: "100vh" }}
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<Menu
					style={{ marginTop: 40 }}
					onClick={handleItem}
					theme="dark"
					mode="inline"
					items={adminItems}
				/>
			</Sider>
		</>
	);
};

export default SideBar;
