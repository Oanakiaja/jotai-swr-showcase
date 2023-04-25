import Info from "./components/Info";
import StockList from "./components/Stocks";

const App = () => {	
	return (
		<div className="App bg-black text-fuchsia-50 w-full ">
			<div className="p-4 ">Stock</div>
			<Info />
			<StockList />
		</div>
	);
}

export default App;
