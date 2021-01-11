import '../css/App.css';
import React from 'react'
import Menu from '../component/Menu';
import MainPage from '../component/MainPage/MainPage';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {

  return (
		<div className="App">
			<Router>
      	<Menu></Menu>
				<Switch>
					<Route exact path="/" component={MainPage}/>
				</Switch>
			</Router>
		</div>
  );
}

export default App;

/*
Reute.js
/ = {}
/guide = {}
*/