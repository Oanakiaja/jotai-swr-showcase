import React from "react";
import { useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">

			<h1 className="text-red-500">Rspack + React {count}</h1>
			<button type='button' onClick={()=>setCount(p=>p+1)}>add</button>
		</div>
	);
}

export default App;
