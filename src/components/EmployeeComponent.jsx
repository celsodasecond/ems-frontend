import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
	createEmployee,
	getEmployee,
	updateEmployee,
} from "../services/employeeservice";
import { listDepartments } from "../services/DepartmentService";

export function EmployeeComponent() {
	const navigator = useNavigate();
	const { id } = useParams();

	function goToPreviousPage() {
		navigator(-1);
	}

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [departmentId, setDepartmentId] = useState("");
	const [departments, setDepartments] = useState([]);

	useEffect(() => {
		listDepartments()
			.then((response) => {
				setDepartments(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
	});

	const handleFirstName = (e) => setFirstName(e.target.value);

	const handleLastName = (e) => setLastName(e.target.value);

	const handleEmail = (e) => setEmail(e.target.value);

	function validateForm() {
		let valid = true;

		const errorsCopy = { ...errors };

		if (firstName.trim()) {
			errorsCopy.firstName = "";
		} else {
			errorsCopy.firstName = "First name is required";
			valid = false;
		}

		if (lastName.trim()) {
			errorsCopy.lastName = "";
		} else {
			errorsCopy.lastName = "Last name is required";
			valid = false;
		}

		if (email.trim()) {
			errorsCopy.email = "";
		} else {
			errorsCopy.email = "Email is required";
			valid = false;
		}

		if (departmentId.trim()) {
			errorsCopy.department = "";
		} else {
			errorsCopy.department = "Department is required";
			valid = false;
		}

		setErrors(errorsCopy);

		return valid;
	}

	useEffect(() => {
		if (id) {
			getEmployee(id)
				.then((response) => {
					setFirstName(response.data.firstName);
					setLastName(response.data.lastName);
					setEmail(response.data.email);
					setDepartmentId(response.data.departmentId);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [id]);

	function saveOrUpdateEmployee(e) {
		e.preventDefault();

		if (validateForm()) {
			const employee = { firstName, lastName, email, departmentId };
			console.log(employee);

			// Logic for Updating
			if (id) {
				updateEmployee(id, employee)
					.then((response) => {
						console.log(response.data);
						goToPreviousPage();
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				// Logic for Creating
				createEmployee(employee)
					.then((response) => {
						console.log(response.data);
						goToPreviousPage();
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
	}

	function pageTitle() {
		if (id) {
			return (
				<Typography variant="h4" color="blue-gray">
					Update Employee
				</Typography>
			);
		} else {
			return (
				<Typography variant="h4" color="blue-gray">
					Add Employee
				</Typography>
			);
		}
	}

	return (
		<div className="flex justify-center items-center mt-2">
			<Card color="transparent" shadow={false}>
				{pageTitle()}
				<Typography color="gray" className="mt-1 font-normal">
					Enter the details of the employee.
				</Typography>
				<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
					<div className="mb-4 flex flex-col gap-6">
						<Input
							size="lg"
							label="First Name"
							value={firstName}
							error={errors.firstName.length > 0}
							onChange={handleFirstName}
						/>
						{errors.firstName && (
							<div className="invalid-feedback -mt-5 text-sm">
								{errors.firstName}
							</div>
						)}
						<Input
							size="lg"
							label="Last Name"
							value={lastName}
							error={errors.lastName.length > 0}
							onChange={handleLastName}
						/>
						{errors.lastName && (
							<div className="invalid-feedback -mt-5 text-sm">
								{errors.lastName}
							</div>
						)}
						<Input
							type="email"
							size="lg"
							label="Email"
							value={email}
							error={errors.email.length > 0}
							onChange={handleEmail}
						/>
						{errors.email && (
							<div className="invalid-feedback -mt-5 text-sm">
								{errors.email}
							</div>
						)}
						<select
							className={`${errors.department ? "is-invalid" : ""}`}
							value={departmentId}
							onChange={(e) => setDepartmentId(e.target.value)}>
							<option value="Select Department" disabled>
								Select Department
							</option>
							{departments.map((department) => {
								return (
									<option key={department.id} value={department.id}>
										{department.departmentName}
									</option>
								);
							})}
						</select>
						{errors.department && (
							<div className="invalid-feedback -mt-5 text-sm">
								{errors.department}
							</div>
						)}
					</div>
					<Button className="mt-6" fullWidth onClick={saveOrUpdateEmployee}>
						{id ? "Update" : "Add"} Employee
					</Button>
					{!id && (
						<Typography color="gray" className="mt-4 text-center font-normal">
							Already added the employee?{" "}
							<a
								href="#"
								className="font-medium text-gray-900"
								onClick={goToPreviousPage}>
								Go back
							</a>
						</Typography>
					)}
				</form>
			</Card>
		</div>
	);
}

export default EmployeeComponent;
