import { Outlet } from "react-router-dom";

import "./style.less";

import Header from "../Header";
import AchieveNotice from "../../blocks/AchieveNotice";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <AchieveNotice />
    </>
  );
}

export default MainLayout;
