import '../css/Menu.css';
import ThirdBlock from './MainPage/ThirdBlock';

function Menu() {
  return (
    <div className="App">
      <nav className="App-header">
        <a className="logo">플젝하쉴?!</a>
				<ul className="menu">
					<li>가이드</li>
					<li>프로젝트 열람</li>
					<li>프로젝트 등록</li>
				</ul>
				<img className="login" src='image/login.png'></img>
      </nav>
    </div>
  );
}

export default Menu;
