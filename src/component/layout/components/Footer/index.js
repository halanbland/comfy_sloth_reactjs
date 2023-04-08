import classNames from "classnames/bind";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx("wrapper")}>
            <span className={cx("year")}>@ 2023</span>
            <span className={cx("brand")}>ComfySloth</span>
            <span>All right reserved</span>
        </div>
    );
}

export default Footer;
