import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { NavHome } from "../../component/layout/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../actions";

const cx = classNames.bind(styles);

function Cart() {
    const data = useSelector((store) => store.reducer.data);
    const [listData, setListData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(
        data.reduce((init, curr) => {
            return init + curr.price * curr.num;
        }, 0)
    );
    const price = () => {
        let a = data.reduce((init, curr) => {
            return init + curr.price * curr.num;
        }, 0);
        return a;
    };

    const dispatch = useDispatch();

    useEffect(() => {
        setListData([...data]);
    }, [data]);
    const handleDecrease = (id) => {
        dispatch(actions.decrease(id));
        setTotalPrice(price());
    };
    const handleIncrease = (id) => {
        dispatch(actions.increase(id));
        setTotalPrice(price());
    };

    return (
        <div className={cx("wrapper")}>
            {listData.length === 0 ? (
                <div className={cx("cart__emtry")}>
                    <h2 className={cx("cart__emtry-heading")}>
                        Your cart is empty
                    </h2>
                    <Link to={"/products"} className={cx("btn")}>
                        Fill it
                    </Link>
                </div>
            ) : (
                <div>
                    <NavHome />
                    <div className={cx("container")}>
                        <div className={cx({ grid: true, wide: true })}>
                            <div className={cx("cart__header")}>
                                <ul className={cx("info__list")}>
                                    <li className={cx("info__list-item")}>
                                        Item
                                    </li>
                                    <li className={cx("info__list-item")}>
                                        Price
                                    </li>
                                    <li className={cx("info__list-item")}>
                                        Quantity
                                    </li>
                                    <li className={cx("info__list-item")}>
                                        Subtotal
                                    </li>
                                    <li
                                        className={cx(
                                            "info__list-item",
                                            "info__list-item-last"
                                        )}
                                    ></li>
                                </ul>
                                <div className={cx("underline")}></div>
                            </div>
                            <ul className={cx("product__list")}>
                                {listData.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={cx("product__list-item")}
                                        >
                                            <div
                                                className={cx(
                                                    "product__info-wrap"
                                                )}
                                            >
                                                <img
                                                    className={cx(
                                                        "product__info-img"
                                                    )}
                                                    src={item.img}
                                                />
                                                <div
                                                    className={cx(
                                                        "product__info"
                                                    )}
                                                >
                                                    <h4
                                                        className={cx(
                                                            "product__info-heading"
                                                        )}
                                                    >
                                                        {item.name}
                                                    </h4>
                                                    <div
                                                        className={cx(
                                                            "product__color"
                                                        )}
                                                    >
                                                        <span
                                                            className={cx(
                                                                "product__color-title"
                                                            )}
                                                        >
                                                            Color
                                                        </span>
                                                        <span
                                                            style={{
                                                                backgroundColor:
                                                                    item.color,
                                                            }}
                                                            className={cx(
                                                                "product__color-type"
                                                            )}
                                                        ></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span
                                                className={cx("product__price")}
                                            >
                                                ${item.price.toLocaleString()}
                                            </span>
                                            <div
                                                className={cx(
                                                    "product__quantity"
                                                )}
                                            >
                                                <span
                                                    onClick={() => {
                                                        handleDecrease(item.id);
                                                    }}
                                                    className={cx(
                                                        "decrese__btn"
                                                    )}
                                                >
                                                    -
                                                </span>
                                                <span
                                                    className={cx(
                                                        "products__number"
                                                    )}
                                                >
                                                    {item.num}
                                                </span>
                                                <span
                                                    onClick={() =>
                                                        handleIncrease(item.id)
                                                    }
                                                    className={cx(
                                                        "increse__btn"
                                                    )}
                                                >
                                                    +
                                                </span>
                                            </div>
                                            <span
                                                className={cx(
                                                    "product__total-price"
                                                )}
                                            >
                                                $
                                                {(
                                                    item.price * item.num
                                                ).toLocaleString()}
                                            </span>
                                            <div
                                                className={cx(
                                                    "product__delete"
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        "product__delete-wrap"
                                                    )}
                                                    onClick={() =>
                                                        dispatch(
                                                            actions.deleteData(
                                                                item.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            "product__delete-icon"
                                                        )}
                                                        icon={faTrash}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className={cx("choice")}>
                                <Link
                                    to={"/products"}
                                    className={cx("btn", "btn--shopping")}
                                >
                                    Continue shopping
                                </Link>
                                <button
                                    onClick={() => dispatch(actions.clearAll())}
                                    className={cx("btn", "btn--clear")}
                                >
                                    Clear shopping cart
                                </button>
                            </div>
                            <div className={cx("pay")}>
                                <div className={cx("pay__wrap")}>
                                    <div className={cx("total")}>
                                        <span className={cx("subtotal")}>
                                            Subtotal :
                                        </span>
                                        <span className={cx("total-price")}>
                                            ${totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className={cx("shipping")}>
                                        <span className={cx("free")}>
                                            Shipping free :
                                        </span>
                                        <span className={cx("total-freeship")}>
                                            $5.34
                                        </span>
                                    </div>
                                    <div className={cx("underline")}></div>
                                    <div className={cx("total-rest")}>
                                        <span
                                            className={cx("total-rest__titlte")}
                                        >
                                            Order Total :
                                        </span>
                                        <span
                                            className={cx("total-rest__price")}
                                        >
                                            $
                                            {(
                                                totalPrice + 5.34
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    to={"/checkout"}
                                    className={cx("btn", "btn--pay")}
                                >
                                    Proceed to checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
