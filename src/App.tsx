import Info from "./components/Info";
import Status from "./components/Status";
import { useInfo } from "./database/swr";
import { useMockSocket } from "./database/socket";
import StockList from "./components/Stocks";

const App = () => {
	useInfo()
	useMockSocket()
	
	return (
		<div className="App bg-black text-fuchsia-50 w-full h-screen">
			<div className="p-4 ">Stock</div>
			<Info />
			<StockList />
		</div>
	);
}


export default App;
