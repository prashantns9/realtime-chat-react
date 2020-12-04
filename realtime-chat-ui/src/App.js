import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import './App.css';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';

function App() {
	return (
		<Router>
			<h1> App </h1>

			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/chat/:roomName/:userName">
					<Chat />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
