import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createEmployee } from "../services/employeeservice";

export function EmployeeComponent() {
	const navigator = useNavigate();

	function goToPreviousPage() {
		navigator(-1);
	}

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
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
		}

		setErrors(errorsCopy);

		return valid;
	}

	function saveEmployee(e) {
		e.preventDefault();

		if (validateForm()) {
			const employee = { firstName, lastName, email };
			console.log(employee);

			createEmployee(employee).then((response) => {
				console.log(response.data);
				goToPreviousPage();
			});
		}
	}

	return (
		<div className="flex justify-center items-center mt-2">
			<Card color="transparent" shadow={false}>
				<Typography variant="h4" color="blue-gray">
					Add Employee
				</Typography>
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
					</div>
					<Button className="mt-6" fullWidth onClick={saveEmployee}>
						Add Employee
					</Button>
					<Typography color="gray" className="mt-4 text-center font-normal">
						Already added the employee?{" "}
						<a
							href="#"
							className="font-medium text-gray-900"
							onClick={goToPreviousPage}>
							Go back
						</a>
					</Typography>
				</form>
			</Card>
		</div>
	);
}

export default EmployeeComponent;
