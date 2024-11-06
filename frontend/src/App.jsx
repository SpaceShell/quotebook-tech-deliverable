import "./App.css";
import { useState } from "react";
import { Message } from "./message";
import { FormLayout } from "./form";
import Image from 'react-bootstrap/Image';
import Logo from "../public/quotebook_logo.png"

function App() {
	const [date, setDate] = useState("lastweek")
	const [submitted, setSubmitted] = useState(false)

	const changeDate = (e) => {
		setDate(e.target.value)
	}

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<div className="lg:w-1/3 min-h-screen md:min-h-fit lg:min-h-screen bg-zinc-800 text-white px-12 md:px-16 py-20 lg:py-10 lg:float-left lg:mr-10 relative">
				<div className="flex">
				<Image className="size-12 md:size-14 lg:size-12 bg-white mr-3" src={Logo} roundedCircle/>
				<h1 className="text-4xl md:text-5xl lg:text-[3vw] lg:leading-[2.5rem] xl:text-4xl align-middle">Quotebook</h1>
				</div>
				<p className="my-5 ">Welcome to the Hack at UCI Quotebook! Post your quotes and view what others have submitted!</p>

				<h2 className="mb-4">Submit a quote</h2>
				<FormLayout setSubmitted={setSubmitted}/>
				<p className="mt-40 relative top-12">Hack at UCI Tech Deliverable</p>
			</div>
			<div className="md:h-screen md:overflow-y-auto">
				<form>
					<label htmlFor="age">Date posted</label>
					<select id="age" defaultValue={"lastweek"} onChange={(e) => changeDate(e)} name="age">
						<option value={"lastweek"}>Last week</option>
						<option value={"lastmonth"}>Last month</option>
						<option value={"lastyear"}>Last year</option>
						<option value={"all"}>All quotes</option>
					</select>
				</form>

				<h2>Previous Quotes</h2>
				<Message postedDate={date} submitted={submitted}/>
			</div>
		</div>
	);
}

import 'bootstrap/dist/css/bootstrap.min.css';
export default App;
