import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";

import styles from "./NavHome.module.scss";

const cx = classNames.bind(styles);

function NavHome({ children, ...props }) {
    const location = useLocation();
    const currentPath = location.pathname;

    // Cắt path bằng split() method
    const pathSegments = currentPath.split("/").slice(0, 2);
    const cutPath = pathSegments.join(" / ");
    return (
        <div className={cx("wrapper")}>
            <div className={cx({ grid: true, wide: true })}>
                <div className={cx("content")}>
                    <Link to={"/"} className={cx("nav-home")}>
                        Home
                    </Link>
                    <pre {...props} className={cx("curr-page")}>
                        {cutPath}
                    </pre>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default NavHome;
