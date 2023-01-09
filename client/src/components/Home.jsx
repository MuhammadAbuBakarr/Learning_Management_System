import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { Layout } from "antd";
import { useEffect } from "react";
import GettingAllLists from "./services/GettingAllLists";
import { useSelector } from "react-redux";
const Home = () => {
	const lists = useSelector((e) => e.listReducer);

	const { Header, Content, Footer, Sider } = Layout;
	useEffect(() => {
		<GettingAllLists />;
	}, []);

	return (
		<>
			<GettingAllLists />
			<Layout>
				<SideBar />
				<Layout>
					<Content className="flex ">
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</>
		// <Layout
		// 	style={{
		// 		minHeight: "100vh",
		// 	}}
		// >
		// 	<Sider
		// 		collapsible
		// 		collapsed={collapsed}
		// 		onCollapse={(value) => setCollapsed(value)}
		// 	>
		// 		<Menu
		// 			theme="dark"
		// 			mode="inline"
		// 			items={[{ label: "Item ", key: "kajsd" }]}
		// 		/>
		// 	</Sider>
		// </Layout>
	);
};

export default Home;
