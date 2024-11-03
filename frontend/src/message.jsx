import { useState, useEffect } from "react";

export function Message({postedDate, setSubmitted, submitted}) {
    const [data, setData] = useState(null)

	useEffect(() => {
		fetch(`/api/data?age=${postedDate}`).then((response) => {
			return response.json()
		})
		.then(data => setData(data))
	}, [postedDate, submitted])

    return(
        <div className="messages">
				{data ? (
					data.quotes.map((data, i) => (
						<div key={i}>
							<p>{data.name}</p>
							<p>{data.message}</p>
							<p>{data.time}</p>
						</div>
					))
				) : (
					<p></p>
				)}
			</div>
    )
}