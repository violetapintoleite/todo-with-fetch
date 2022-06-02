import React, { useState } from "react";

//include images into your bundle

//create your first component
const Todos = () => {
	const [list, setList] = useState([]);

	const [value, setValue] = useState("");
	const addToList = () => {
		let tempArr = list;
		tempArr.push(value);
		setList(tempArr);
		setValue("");
	};

	const deleteItem = (index) => {
		let temp = list.filter((item, i) => i !== index);

		setList(temp);
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
						<li id="task">
							{item}
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
