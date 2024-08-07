'use client';
import { useState } from 'react';

const managerList = [
	{ name: 'Nick', weight: 360 },
	{ name: 'George', weight: 250 },
	{ name: 'Michael', weight: 150 },
	{ name: 'Sasha', weight: 100 },
	{ name: 'Neel', weight: 80 },
	{ name: 'Andrew', weight: 60 },
];

export default function Home() {
	const [pickOrder, setPickOrder] = useState({
		1: '',
		2: '',
		3: '',
		4: '',
		5: '',
		6: '',
	});

	const [pickNumber, setPickNumber] = useState(1);

	const [drawnUsers, setDrawnUsers] = useState([]);

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
		let selectedUser = weightedRandomDraw(managerList);
		while (drawnUsers.includes(selectedUser)) {
			console.log('manager already drawn');
			selectedUser = weightedRandomDraw(managerList);
		}

		setDrawnUsers((prevDrawnUsers) => {
			const updatedDrawnUsers = [...prevDrawnUsers, selectedUser];
			return updatedDrawnUsers;
		});

		return selectedUser;
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
				disabled={pickNumber > 6}
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
