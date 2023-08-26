import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { listEmployees } from "../services/employeeservice";

const ListEmployeeComponent = () => {
	const [employees, setEmployees] = useState([]);

	const TABLE_HEAD = ["Id", "First Name", "Last Name", "Email", ""];

	useEffect(() => {
		listEmployees()
			.then((response) => {
				setEmployees(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="mt-5 mx-32">
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
						{employees.map(({ id, firstName, lastName, email }, index) => {
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
											as="a"
											href="#"
											variant="small"
											color="blue-gray"
											className="font-medium">
											Edit
										</Typography>
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

export default ListEmployeeComponent;
