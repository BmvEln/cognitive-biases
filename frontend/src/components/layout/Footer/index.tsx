import "./style.less";
import { LINK_HOME, PROJECT_NAME } from "../../../static/static.tsx";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer">
      <div className="FooterContent">
        <Link to={LINK_HOME}>{PROJECT_NAME}</Link>
      </div>
    </div>
  );
}

export default Footer;
