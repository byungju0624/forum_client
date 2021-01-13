import { useContext } from 'react';
import '../css/Menu.css';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React from 'react'
import login from '../component/App'
import selected from '../component/App'
import MainPage from '../component/MainPage/MainPage';
import Guide from '../component/Guide/Guide'
import Project from '../component/Project/Project'
import Regist from '../component/Regist/Regist'
import MyPage from '../component/MyPage/MyPage'

function Menu(props) {

  /*
	let ClickMenu = (number) => {
		const selected = useContext(selected)      //useContext는 조회하는 역할을 한다.
		selected(number)
	}*/

  return (
		<Router>
    <div className="App">
      <header className="App-header">
				<Link to="/" style={{textDecoration:'none', color:'black'}}>
        	<h1 className="logo" onClick={()=>{props.setMenu(0)}}>플젝하쉴?!</h1>
				</Link>
				<nav className="nav">
					<Link to="/guide" style={{textDecoration:'none', color:'black'}}>
						<span className="menu" onClick={()=>{props.setMenu(1)}}>가이드</span>
					</Link>
					<Link to="/project" style={{textDecoration:'none', color:'black'}}>
						<span className="menu" onClick={()=>{props.setMenu(2)}}>프로젝트 열람</span>
					</Link>
					<Link to="/regist" style={{textDecoration:'none', color:'black'}}>
						<span className="menu" onClick={()=>{props.setMenu(3)}}>프로젝트 등록</span>
					</Link>
				</nav>
				<img className="login_image" src='image/login.png'></img>
      </header>
			<Switch>
					<Route exact path="/" component={MainPage}/>
					<Route exact path="/guide" component={Guide}/>
					<Route exact path="/project" component={Project}/>
					<Route exact path="/regist" component={Regist}/>
					<Route exact path="/mypage" component={MyPage}/>
				</Switch>
    </div>
		</Router>
  );
}

export default Menu;



/*

import { useContext } from 'react';
import '../css/Menu.css';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React from 'react'
import login from '../component/App'
import selected from '../component/App'
import MainPage from '../component/MainPage/MainPage';
import Guide from '../component/Guide/Guide'
import Project from '../component/Project/Project'
import MyPage from '../component/MyPage/MyPage'

function Menu(props) {


  return (
		<Router>
    <div className="App">
      <header className="App-header">
        <h1 className="logo">플젝하쉴?!</h1>
				<nav className="nav">
					<Link to="/guide">
						<span className="menu" onClick={()=>{props.setMenu(1)}}>가이드</span>
					</Link>
					<span className="menu" onClick={()=>{props.setMenu(2)}}>프로젝트 열람</span>
					<span className="menu" onClick={()=>{props.setMenu(3)}}>프로젝트 등록</span>
				</nav>
				<img className="login_image" src='image/login.png'></img>
      </header>
			<Switch>
					<Route exact path="/" component={MainPage}/>
					<Route exact path="/guide" component={Guide}/>
					<Route exact path="/project" component={Project}/>
					<Route exact path="/mypage" component={MyPage}/>
				</Switch>
    </div>
		</Router>
  );
}


*/