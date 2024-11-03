import "./App.css";
import { useState } from "react";
import { Message } from "./message";

function App() {
	const [date, setDate] = useState("lastweek")
	const [submitted, setSubmitted] = useState(false)

	const changeDate = (e) => {
		setDate(e.target.value)
	}

	const preventRefresh = (e) => {
		e.preventDefault()
		fetch("/api/quote", {
			method: "POST",
			headers: {
				"Content-Type": 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				'name': e.target[0].value,
				'message': e.target[1].value,
				'age': date
			}),
		}).then((response) => {
			setSubmitted(response)
		})
	}

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			<form onSubmit={(e) => preventRefresh(e)} action="/api/quote" method="post" id="form">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit" name="submit" value={"submit"}>Submit</button>

				<label htmlFor="age">Date posted</label>
				<select id="age" defaultValue={"lastweek"} onChange={(e) => changeDate(e)} name="age">
					<option value={"lastweek"}>Last week</option>
					<option value={"lastmonth"}>Last month</option>
					<option value={"lastyear"}>Last year</option>
					<option value={"all"}>All quotes</option>
				</select>
			</form>

			<h2>Previous Quotes</h2>
			<Message postedDate={date} submitted={submitted} setSubmitted={setSubmitted}/>
		</div>
	);
}

export default App;
