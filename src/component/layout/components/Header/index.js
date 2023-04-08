import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCartShopping,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Header() {
    const data = useSelector((store) => store.reducer.data);
    const [cartCout, setCartCount] = useState(() =>
        data.reduce((init, curr) => init + curr.num, 0)
    );

    useEffect(() => {
        setCartCount(data.reduce((init, curr) => init + curr.num, 0));
    }, [data]);
    return (
        <div className={cx("wrapper", { grid: true })}>
            <div className={cx({ grid: true, wide: true })}>
                <div className={cx("header")}>
                    <div className={cx("logo")}>
                        <img
                            className={cx("logo__img")}
                            src="https://react-course-comfy-sloth-store.netlify.app/static/media/logo.221f6b13e6eaaad5828372464f73a1a4.svg"
                        />
                    </div>
                    <ul className={cx("navbar-list")}>
                        <li className={cx("navbar-list__item")}>
                            <Link
                                to={"/"}
                                className={cx("navbar-list__item-link")}
                            >
                                Home
                            </Link>
                        </li>
                        <li className={cx("navbar-list__item")}>
                            <Link
                                to={"/about"}
                                className={cx("navbar-list__item-link")}
                            >
                                About
                            </Link>
                        </li>
                        <li className={cx("navbar-list__item")}>
                            <Link
                                to={"/products"}
                                className={cx("navbar-list__item-link")}
                            >
                                Products
                            </Link>
                        </li>
                        <li className={cx("navbar-list__item")}>
                            <Link
                                to={"/checkout"}
                                className={cx("navbar-list__item-link")}
                            >
                                Checkout
                            </Link>
                        </li>
                    </ul>
                    <div className={cx("cart__wrapper")}>
                        <Link to={"/cart"} className={cx("cart")}>
                            Cart
                            <span className={cx("cart__icon-wrapper")}>
                                <FontAwesomeIcon
                                    className={cx("cart__icon")}
                                    icon={faCartShopping}
                                ></FontAwesomeIcon>
                                <span className={cx("cart__count")}>
                                    {cartCout}
                                </span>
                            </span>
                        </Link>
                        <div className={cx("logout")}>
                            Logout
                            <FontAwesomeIcon
                                className={cx("logout__icon")}
                                icon={faUser}
                            />
                            -
                        </div>
                        <FontAwesomeIcon
                            className={cx("navbar__icon")}
                            icon={faBars}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
