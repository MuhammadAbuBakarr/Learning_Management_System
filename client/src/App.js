import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherLogin from "./components/admin/logins/TeacherLogin";
import TeacherSignup from "./components/admin/signups/TeacherSignup";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import StudentSignUp from "./components/admin/signups/StudentSignUp";
import StudentLogin from "./components/admin/logins/StudentLogin";
import CreateClass from "./components/admin/create/CreateClass";
import CreateSubject from "./components/admin/create/CreateSubject";
import CreateTest from "./components/admin/create/CreateTest";
import ViewTests from "./components/admin/view/tests/ViewTests";
import SingleTest from "./components/admin/view/tests/SingleTest";
import ViewStudents from "./components/admin/view/students/ViewStudents";
function App() {
	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="/registerTeacher" element={<TeacherSignup />} />
						<Route path="/registerStudent" element={<StudentSignUp />} />

						<Route path="/loginTeacher" element={<TeacherLogin />} />
						<Route path="/loginStudent" element={<StudentLogin />} />
						<Route path="/createClass" element={<CreateClass />} />
						<Route path="/createSubject" element={<CreateSubject />} />
						<Route path="/createTest" element={<CreateTest />} />
						{/* View Tests */}
						<Route path="/viewTest" element={<ViewTests />} />
						<Route path="/viewTest/:_id" element={<SingleTest />} />
						<Route path="/viewStudents" element={<ViewStudents />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
