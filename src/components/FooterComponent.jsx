import { Typography } from "@material-tailwind/react";

export default function FooterComponent() {
	return (
		<div className="fixed bottom-0 flex justify-center w-full">
			<footer className="flex flex-col items-center justify-center border-t border-blue-gray-50 py-2 text-center">
				<Typography color="blue-gray" className="font-normal">
					&copy; 2023 Simple Employee Management System
				</Typography>
				<Typography className="text-xs -mt-1">
					Made by: <a href="https://github.com/celsodasecond">Celso</a>
				</Typography>
			</footer>
		</div>
	);
}
