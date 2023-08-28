import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import DepartmentComponent from "./components/DepartmentComponent";

function App() {
	return (
		<>
			<BrowserRouter>
				<HeaderComponent />
				<Routes>
					<Route path="/" element={<ListEmployeeComponent />}></Route>

					{/* Employees */}
					<Route path="/employees" element={<ListEmployeeComponent />}></Route>
					<Route path="/add-employee" element={<EmployeeComponent />}></Route>
					<Route path="/edit-employee/:id" element={<EmployeeComponent />}></Route>

					{/* Departments */}
					<Route path="/departments" element={<ListDepartmentComponent />}></Route>
					<Route path="/add-department" element={<DepartmentComponent />}></Route>
					<Route path="/edit-department/:id" element={<DepartmentComponent />}></Route>

				</Routes>
				<FooterComponent />
			</BrowserRouter>
		</>
	);
}

export default App;
