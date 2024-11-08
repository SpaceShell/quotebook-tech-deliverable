import { useState, useEffect } from "react";

export function Message({postedDate, submitted}) {
    const [data, setData] = useState(null)

	useEffect(() => {
		fetch(`/api/data?age=${postedDate}`).then((response) => {
			return response.json()
		})
		.then(data => setData(data))
	}, [postedDate, submitted])

	return(
        <div className="md:columns-2 px-10 md:px-28 gap-16 mb-10">
			{data ? (
				data.quotes.map((data, i) => (
					<div key={i} className="shadow-[0_1px_3px_3px_rgb(0,0,0,0.1),_0_5px_2px_-2px_rgb(0,0,0,0.1)] rounded-xl px-10 pt-4 pb-3 h-fit w-full mt-10 inline-block">
						<p className="mb-4">"{data.message}"</p>
						<p className="text-right mb-1 font-bold text-cyan-900">- {data.name}</p>
						<p className="text-right text-sm text-gray-400">{data.time[1]} | {data.time[0]}</p>
					</div>
				))
			) : (
				<p></p>
			)}
		</div>
    )
}