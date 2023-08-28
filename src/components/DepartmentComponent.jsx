import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
	createDepartment,
	getDepartment,
	updateDepartment,
} from "../services/DepartmentService";

export function DepartmentComponent() {
	const navigator = useNavigate();
	const { id } = useParams();

	function goToPreviousPage() {
		navigator(-1);
	}

	const [departmentName, setDepartmentName] = useState("");
	const [departmentDescription, setDepartmentDescription] = useState("");

	const [errors, setErrors] = useState({
		departmentName: "",
		departmentDescription: "",
	});

	const handleDepartmentName = (e) => setDepartmentName(e.target.value);

	const handleDepartmentDescription = (e) =>
		setDepartmentDescription(e.target.value);

	function validateForm() {
		let valid = true;

		const errorsCopy = { ...errors };

		if (departmentName.trim()) {
			errorsCopy.departmentName = "";
		} else {
			errorsCopy.departmentName = "Department name is required";
			valid = false;
		}

		if (departmentDescription.trim()) {
			errorsCopy.departmentDescription = "";
		} else {
			errorsCopy.departmentDescription = "Department description is required";
			valid = false;
		}

		setErrors(errorsCopy);

		return valid;
	}

	useEffect(() => {
		if (id) {
			getDepartment(id)
				.then((response) => {
					setDepartmentName(response.data.departmentName);
					setDepartmentDescription(response.data.departmentDescription);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [id]);

	function saveOrUpdateDepartment(e) {
		e.preventDefault();

		if (validateForm()) {
			const department = { departmentName, departmentDescription };
			console.log(department);

			// Logic for Updating
			if (id) {
				updateDepartment(id, department)
					.then((response) => {
						console.log(response.data);
						goToPreviousPage();
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				// Logic for Creating
				createDepartment(department)
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
					Update Department
				</Typography>
			);
		} else {
			return (
				<Typography variant="h4" color="blue-gray">
					Add Department
				</Typography>
			);
		}
	}

	return (
		<div className="flex justify-center items-center mt-2">
			<Card color="transparent" shadow={false}>
				{pageTitle()}
				<Typography color="gray" className="mt-1 font-normal">
					Enter the details of the department.
				</Typography>
				<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
					<div className="mb-4 flex flex-col gap-6">
						<Input
							size="lg"
							label="Department Name"
							value={departmentName}
							error={errors.departmentName.length > 0}
							onChange={handleDepartmentName}
						/>
						{errors.departmentName && (
							<div className="invalid-feedback -mt-5 text-sm">
								{errors.departmentName}
							</div>
						)}
						<Input
							size="lg"
							label="Department Description"
							value={departmentDescription}
							error={errors.departmentDescription.length > 0}
							onChange={handleDepartmentDescription}
						/>
						{errors.departmentDescription && (
							<div className="invalid-feedback -mt-5 text-sm">
								{errors.departmentDescription}
							</div>
						)}
					</div>
					<Button className="mt-6" fullWidth onClick={saveOrUpdateDepartment}>
						{id ? "Update" : "Add"} Department
					</Button>
					{!id && (
						<Typography color="gray" className="mt-4 text-center font-normal">
							Already added the department?{" "}
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

export default DepartmentComponent;
