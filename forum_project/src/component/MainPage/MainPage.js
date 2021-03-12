import { memo } from "react";
import "../../css/MainPage/MainPage.css";
import FirstBlock from "../MainPage/FirstBlock";

const MainPage = memo(() => {
  return (
    <div className="MainPage">
      <FirstBlock></FirstBlock>
    </div>
  );
});

export default MainPage;
