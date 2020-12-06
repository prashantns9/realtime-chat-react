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
		<div className="container">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/chat/:roomName/:userName">
						<Chat />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
