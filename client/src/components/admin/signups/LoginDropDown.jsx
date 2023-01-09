import React from "react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { myUser } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/userSlice";
const LoginDropDown = () => {
	const user = useSelector(myUser);
	const dispatch = useDispatch();
	const nav = useNavigate();
	const itemsBeforeSignIn = [
		{ label: "Login as Student", key: "/loginStudent" },
		{ label: "Login as Teacher", key: "/loginTeacher" },
	];
	const itemsAfterSignIn = [{ label: "Logout", key: "logout" }];
	const menuClick = (e) => {
		if (e.key === "logout") {
			dispatch(logout());
			return;
		}
		nav(e.key);
	};

	const conditionalItems = () => {
		if (Object.keys(user).length > 0) {
			return itemsAfterSignIn;
		} else {
			return itemsBeforeSignIn;
		}
	};
	const menuProps = {
		items: conditionalItems(),
		onClick: menuClick,
	};
	return (
		<>
			<Dropdown.Button
				menu={menuProps}
				trigger={["click"]}
				icon={<DownOutlined />}
			>
				<div>{user.role ? <Space>LogOut</Space> : <Space>Login</Space>}</div>
			</Dropdown.Button>
		</>
	);
};

export default LoginDropDown;
