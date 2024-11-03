import "./App.css";
import { useState } from "react";
import { Message } from "./message";

function App() {
	const [date, setDate] = useState("lastweek")

	const changeDate = (e) => {
		setDate(e.target.value)
	}

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
				<label htmlFor="age">Date posted</label>
				<select name="age" id="age" defaultValue={"lastweek"} onChange={(e) => changeDate(e)}>
					<option value={"lastweek"}>Last week</option>
					<option value={"lastmonth"}>Last month</option>
					<option value={"lastyear"}>Last year</option>
					<option value={"all"}>All quotes</option>
				</select>
			</form>

			<h2>Previous Quotes</h2>
			<Message postedDate={date}/>
		</div>
	);
}

export default App;
