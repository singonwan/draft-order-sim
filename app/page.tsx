'use client';
import { useState } from 'react';

export default function Home() {
	const [managerList, setManagerList] = useState([
		{ name: 'Nick', weight: 36 },
		{ name: 'George', weight: 25 },
		{ name: 'Michael', weight: 15 },
		{ name: 'Sasha', weight: 10 },
		{ name: 'Neel', weight: 8 },
		{ name: 'Andrew', weight: 6 },
	]);

	const [pickOrder, setPickOrder] = useState({
		'1': '',
		'2': '',
		'3': '',
		'4': '',
		'5': '',
		'6': '',
	});

	const [pickNumber, setPickNumber] = useState(1);

	// Function to perform a weighted random draw
	function weightedRandomDraw(managerList: { name: string; weight: number }[]) {
		let totalWeight = managerList.reduce((sum, user) => sum + user.weight, 0);
		console.log(totalWeight);
		let random = Math.random() * totalWeight;
		console.log(random);
		let cumulativeWeight = 0;

		for (let manager of managerList) {
			cumulativeWeight += manager.weight;
			if (random < cumulativeWeight) {
				console.log(manager.name);
				return manager.name;
			}
		}
		return null; // Just in case something goes wrong
	}

	// Function to perform the weighted random draw until all users are selected
	function drawAllUsers(managerList: { name: string; weight: number }[]) {
		let remainingManagers = [...managerList];

		if (remainingManagers.length > 0) {
			let selectedUser = weightedRandomDraw(remainingManagers);
			remainingManagers = remainingManagers.filter(
				(user) => user.name !== selectedUser
			);
			setManagerList(remainingManagers);

			return selectedUser;
		}

		return null;
	}

	function handleClick() {
		const selectedManager = drawAllUsers(managerList);

		setPickOrder((prevPickOrder) => {
			const updatedPickOrder = { ...prevPickOrder };
			updatedPickOrder[pickNumber] = selectedManager;
			return updatedPickOrder;
		});

		setPickNumber((pick) => pick + 1);
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-xl font-bold">Fantasy Draft Order</h1>

			<button
				onClick={handleClick}
				className="bg-indigo-500 rounded-full border-2 p-4 text-white"
			>
				{pickNumber < 7 ? `Pick ${pickNumber}` : 'Final Draft Order'}
			</button>

			<h1>Pick 1 : {pickOrder['1']}</h1>
			<h1>Pick 2 : {pickOrder['2']}</h1>
			<h1>Pick 3 : {pickOrder['3']}</h1>
			<h1>Pick 4 : {pickOrder['4']}</h1>
			<h1>Pick 5 : {pickOrder['5']}</h1>
			<h1>Pick 6 : {pickOrder['6']}</h1>
		</main>
	);
}
