import { Link } from "react-router-dom";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store.tsx";

import "./style.less";

import { setAchievementNotice } from "../../../redux/slices/achievementNoticeSlice.tsx";

import {
  LINK_ABOUT,
  LINK_ACHIEVEMENTS,
  LINK_HOME,
  LINK_PROFILE,
  LINK_SING_IN,
  LINK_SING_UP,
  PROJECT_NAME,
} from "../../../static/static.tsx";

function Header() {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state: RootState) => state.user);
  const { showNotice } = useAppSelector(
    (state: RootState) => state.achievementNotice,
  );

  return (
    <div className="Header">
      <div className="HeaderContent">
        <div className="HeaderLogo">
          <Link to={LINK_HOME}>{PROJECT_NAME}</Link>
        </div>

        <div className="HeaderLinks">
          <Link to={LINK_HOME}>Главная</Link>
          <Link
            className={showNotice ? "notification" : ""}
            onClick={() => dispatch(setAchievementNotice(false))}
            to={LINK_ACHIEVEMENTS}
          >
            Достижения
          </Link>
          <Link to={LINK_ABOUT}>О нас</Link>
          {email ? (
            <Link to={LINK_PROFILE}>
              <div className="HeaderProfile">{email.slice(0, 1)}</div>
            </Link>
          ) : (
            <>
              <Link to={LINK_SING_IN}>Вход</Link>
              <Link to={LINK_SING_UP}>Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
