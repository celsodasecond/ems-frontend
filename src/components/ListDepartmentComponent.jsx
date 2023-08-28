import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { listDepartments, deleteDepartment } from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
	const [departments, setDepartments] = useState([]);

	const navigator = useNavigate();

	const TABLE_HEAD = ["Id", "Name", "Description", "Actions"];

	useEffect(() => {
		getAllDepartments();
	}, []);

	function getAllDepartments() {
		listDepartments()
			.then((response) => {
				setDepartments(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function addNewDepartment() {
		navigator("/add-department");
	}

	function updateDepartment(id) {
		navigator(`/edit-department/${id}`);
	}

	function removeDepartment(id) {
		if (confirm("Are you sure?")) {
			deleteDepartment(id)
				.then((response) => {
					console.log(response.data);
					getAllDepartments();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	return (
		<div className="mt-5 mx-32">
			<h1 className="text-center text-2xl mb-1">Departments Directory</h1>
			<Button
				className="-my-1"
				size="sm"
				ripple={true}
				onClick={addNewDepartment}>
				Add Department
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
						{departments.map(({ id, departmentName, departmentDescription}, index) => {
							const isLast = index === departments.length - 1;
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
											{departmentName}
										</Typography>
									</td>
									<td className={classes}>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal">
											{departmentDescription}
										</Typography>
									</td>
									<td className={classes}>
										<Button
											color="green"
											size="sm"
											ripple
											className="mr-2"
											onClick={() => updateDepartment(id)}>
											Edit
										</Button>
										<Button
											color="red"
											size="sm"
											ripple
											onClick={() => removeDepartment(id)}>
											Delete
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</Card>
		</div>
	);
};

export default ListDepartmentComponent;
