import React, { useState, useEffect } from "react";

//create your first component
const Todos = () => {
	const [list, setList] = useState([]);

	const [value, setValue] = useState("");

	useEffect(
		() =>
			// here i fetch my todos from the API
			fetch("https://assets.breatheco.de/apis/fake/todos/user/violeta")
				.then((r) => r.json())
				.then((data) => setList(data)), //here it re-set the variable tasks with the incoming data
		[]
	);
	const addToList = () => {
		let tempArr = list;
		tempArr.push({ label: value, done: false });
		setList(tempArr);
		setValue("");
		console.log(tempArr);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/violeta", {
			method: "PUT",
			body: JSON.stringify(tempArr),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	const deleteItem = (index) => {
		let temp = list.filter((item, i) => i !== index);

		setList(temp);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/violeta", {
			method: "PUT",
			body: JSON.stringify(temp),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	return (
		<div className="App">
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>{" "}
			<button onClick={addToList}> Click to Add </button>
			<ul>
				{list.length > 0 ? (
					list.map((item, i) => (
						<li key={i} id="task">
							{item.label}
							<button
								id="delete-button"
								onClick={() => deleteItem(i)}>
								X
							</button>
						</li>
					))
				) : (
					<p>No tasks, add a task</p>
				)}
			</ul>
		</div>
	);
};
export default Todos;
