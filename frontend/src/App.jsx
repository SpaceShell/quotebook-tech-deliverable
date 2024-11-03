import "./App.css";
import { useState, useEffect } from "react";

function App() {
	const [data, setData] = useState(null)

	useEffect(() => {
		fetch("/api/data").then((response) => {
			if (response.status >= 400) {
				throw error
			}
			return response.json()
		})
		.then(data => setData(data))
	}, [setData, data])

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
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			
			<div className="messages">
				{data ? (
					data.quotes.map((data) => (
						<div>
							<p>{data.name}</p>
							<p>{data.message}</p>
							<p>{data.time}</p>
						</div>
					))
				) : (
					<p></p>
				)}
			</div>
		</div>
	);
}

export default App;
