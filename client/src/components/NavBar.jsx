import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import LoginDropDown from "./admin/signups/LoginDropDown";
const NavBar = () => {
	return (
		<>
			<Layout className="bg-[rgb(5,28,51)]">
				<div className="flex justify-between items-center px-16 py-2 text-xl ">
					<Link style={{ color: "black" }} to={"/"}>
						<div className="cursor-pointer text-2xl text-white">Home</div>
					</Link>
					<div>
						<LoginDropDown />
					</div>
				</div>
			</Layout>
		</>
	);
};

export default NavBar;
