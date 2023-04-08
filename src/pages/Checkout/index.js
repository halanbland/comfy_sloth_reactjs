import classNames from "classnames/bind";

import styles from "./Checkout.module.scss";
import { NavHome } from "../../component/layout/components";

const cx = classNames.bind(styles);

function Checkout() {
    return (
        <div className={cx("wrapper")}>
            <NavHome />
            <div className={cx("container")}>
                <h2 className={cx("user__name")}>
                    Hello, Halanbland@Gmail.Com
                </h2>
                <p className={cx("total__pay")}>Your total is $125.99</p>
                <div className={cx("card__pay")}>
                    <div className={cx("card__info")}>
                        <input
                            className={cx("card__number")}
                            placeholder="Card number"
                        />
                        <input
                            className={cx("card__date")}
                            placeholder="MM / YY"
                        />
                        <button className={cx("btn__pay")}>Pay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
