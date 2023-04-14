import React from "react";
import ImageList from "./components/Images";
import Info from "./components/info";
import Status from "./components/status";
import { useInfo } from "./database/swr";
// import { useAtom } from 'jotai'
// import { countAtom } from './atom'

const App = React.memo(() => {
	return (
		<div className="App">
			test
			<Info />
			<Status />
			<ImageList />
		</div>
	);
})

function Wrap() {
	useInfo()
	return <App></App>
}

export default Wrap;
