import '../css/Menu.css';

function Menu() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo">플젝하쉴?!</h1>
				<nav className="nav">
					<span className="menu">가이드</span>
					<span className="menu">프로젝트 열람</span>
					<span className="menu">프로젝트 등록</span>
				</nav>
				<img className="login_image" src='image/login.png'></img>
      </header>
    </div>
  );
}

export default Menu;
