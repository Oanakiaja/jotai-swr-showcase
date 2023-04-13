import React from "react";
import { useAtom } from 'jotai'
import { countAtom } from './atom'

function App() {
	const [count, setCount] = useAtom(countAtom);

	return (
		<div className="App">
			<h1 className="text-red-500">Rspack + React {count}</h1>
			<button type='button' onClick={() => setCount(p => p + 1)}>add</button>
		</div>
	);
}

export default App;
