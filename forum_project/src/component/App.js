import '../css/App.css';
import React, { useState } from 'react'
import Menu from '../component/Menu';
import MainPage from '../component/MainPage/MainPage';
import Guide from '../component/Guide/Guide'
import Project from '../component/Project/Project'
import MyPage from '../component/MyPage/MyPage'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {

	const [login, setLogin] = useState(false)
	const [menu, setMenu] = useState(1)     
	const selected = React.createContext(1)

  return (
		<div className="App">
			<selected.Provider>
				<Router>
					<Menu></Menu>
					<Switch>
						<Route exact path="/" component={MainPage}/>
						<Route exact path="/guide" component={Guide}/>
						<Route exact path="/project" component={Project}/>
						<Route exact path="/mypage" component={MyPage}/>
					</Switch>
				</Router>
			</selected.Provider>
		</div>
  );
}

export default App;

/*
Reute.js
/ = {}
/guide = {}
*/