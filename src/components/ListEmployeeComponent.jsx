import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { listEmployees, deleteEmployee } from "../services/employeeservice";
import { useNavigate } from "react-router-dom";
import { listDepartments } from "../services/DepartmentService";

const ListEmployeeComponent = () => {
	const [employees, setEmployees] = useState([]);
	const [departments, setDepartments] = useState([]);

	const navigator = useNavigate();

	const TABLE_HEAD = [
		"Id",
		"First Name",
		"Last Name",
		"Email",
		"Department",
		"Actions",
	];

	useEffect(() => {
		getAllEmployees();
		getAllDepartments();
	}, []);

	function getAllEmployees() {
		listEmployees()
			.then((response) => {
				setEmployees(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function getAllDepartments() {
		listDepartments()
			.then((response) => {
				setDepartments(response.data);
				console.log("DEPARTMENTS: ", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function addNewEmployee() {
		navigator("/add-employee");
	}

	function updateEmployee(id) {
		navigator(`/edit-employee/${id}`);
	}

	function removeEmployee(id) {
		if (confirm("Are you sure?")) {
			deleteEmployee(id)
				.then((response) => {
					console.log(response.data);
					getAllEmployees();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	return (
		<div className="mt-5 mx-32">
			<h1 className="text-center text-2xl mb-1">List of Employees</h1>
			<Button
				className="-my-1"
				size="sm"
				ripple={true}
				onClick={addNewEmployee}>
				Add Employee
			</Button>
			<Card className="h-full w-full overflow-hidden mt-5">
				<table className="w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th
									key={head}
									className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
									<Typography
										variant="small"
										color="blue-gray"
										className="font-normal leading-none opacity-70">
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{employees.map(
							({ id, firstName, lastName, email, departmentId }, index) => {
								const isLast = index === employees.length - 1;
								const classes = isLast
									? "p-4"
									: "p-4 border-b border-blue-gray-50";

								return (
									<tr key={id}>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal">
												{id}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal">
												{firstName}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal">
												{lastName}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal">
												{email}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal">
												{departments.find((dep) => dep.id == departmentId)
													?.departmentName || "Department not found."}
											</Typography>
										</td>
										<td className={classes}>
											<Button
												color="green"
												size="sm"
												ripple
												className="mr-2"
												onClick={() => updateEmployee(id)}>
												Edit
											</Button>
											<Button
												color="red"
												size="sm"
												ripple
												onClick={() => removeEmployee(id)}>
												Delete
											</Button>
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			</Card>
		</div>
	);
};

export default ListEmployeeComponent;
