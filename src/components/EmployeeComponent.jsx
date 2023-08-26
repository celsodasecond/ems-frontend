import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export function EmployeeComponent() {
	const navigator = useNavigate();

	function goToPreviousPage() {
		navigator(-1);
	}

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const handleFirstName = (e) => setFirstName(e.target.value);

	const handleLastName = (e) => setLastName(e.target.value);

	const handleEmail = (e) => setEmail(e.target.value);

	function saveEmployee(e) {
		e.preventDefault();

		const employee = { firstName, lastName, email };
		console.log(employee);
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
							onChange={handleFirstName}
						/>
						<Input
							size="lg"
							label="Last Name"
							value={lastName}
							onChange={handleLastName}
						/>
						<Input
							type="email"
							size="lg"
							label="Email"
							value={email}
							onChange={handleEmail}
						/>
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
