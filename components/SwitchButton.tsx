import React, { useState } from "react";

interface SwitchButtonTypes {
	setIsYou: (bool: boolean) => void;
	isYou: boolean;
	isAuthenticated: boolean;
}

// const SwitchButton = () => {
const SwitchButton = ({
	setIsYou,
	isYou,
	isAuthenticated,
}: SwitchButtonTypes) => {
	const handleClick = () => {
		setIsYou(true);
	};

	return (
		<div>
			<div className="flex space-x-2 flex-wrap justify-center items-baseline mt-20">
				<button
					className={
						isYou
							? "rounded-lg px-6 py-2 bg-transparent text-primary-orange border border-primary-orange text-lg font-semibold hover:bg-primary-orange hover:text-primary-white duration-300"
							: "rounded-lg px-6 py-2 bg-primary-orange text-primary-white text-lg font-semibold hover:bg-primary-orange  duration-300"
					}
					onClick={() => setIsYou(false)}
				>
					world
				</button>
				{isAuthenticated ? (
					<button
						className={
							!isYou
								? `rounded-lg px-8 py-2 bg-transparent  hover:bg-primary-orange text-primary-orange hover:text-primary-white border border-primary-orange hover:border-transparent duration-300 text-lg font-semibold`
								: `rounded-lg px-8 py-2 bg-primary-orange  hover:bg-primary-orange text-primary-white hover:text-primary-white border border-primary-orange hover:border-transparent duration-300 text-lg font-semibold`
						}
						onClick={handleClick}
					>
						you
					</button>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default SwitchButton;
