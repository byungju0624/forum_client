import '../../css/MainPage/MainPage.css';
import FirstBlock from '../MainPage/FirstBlock'
import SecondBlock from '../MainPage/SecondBlock' 
import ThirdBlock from '../MainPage/ThirdBlock'  

function MainPage() {
  return (
    <div className="MainPage">
      <FirstBlock></FirstBlock>
			<SecondBlock></SecondBlock>
			<ThirdBlock></ThirdBlock>
    </div>
  );
}

export default MainPage;
