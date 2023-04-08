import classNames from "classnames/bind";

import styles from "./ProductDetail.module.scss";
import { NavHome } from "../../component/layout/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import detailApi from "../../apis/detailApi";
import * as actions from "../../actions";

const cx = classNames.bind(styles);

function ProductDetail({}) {
    const dispatch = useDispatch();

    const [data, setData] = useState();
    const [thumb, setThumb] = useState();
    const [info, setInfor] = useState({ num: 1 });
    // Get id from path
    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split("/").slice(-1);
    const id = pathSegments.join("");
    useEffect(() => {
        detailApi(setData, id);
    }, []);

    useEffect(() => {
        if (data) {
            setThumb(data.images[0]["url"]);
            setInfor((prev) => ({
                ...prev,
                color: data.colors[0],
                name: data.name,
                price: data.price,
                shipping: data.shipping,
                img: data.images[0].url,
                id: data.id,
            }));
        }
    }, [data]);

    return (
        <div className={cx("wrapper")}>
            {data && (
                <div>
                    <NavHome style={{ color: "#795744" }}>
                        <pre className={cx("name")}> / {data.name}</pre>
                    </NavHome>

                    <div className={cx({ grid: true, wide: true })}>
                        <div className={cx("container")}>
                            <Link
                                to={"/products"}
                                className={cx("btn__datail")}
                            >
                                Back to product
                            </Link>
                            <div className={cx("content")}>
                                <div className={cx({ row: true })}>
                                    <div
                                        className={cx({
                                            col: true,
                                            "l-6": true,
                                        })}
                                    >
                                        <div className={cx("about__img")}>
                                            <img
                                                className={cx(
                                                    "about__img-main"
                                                )}
                                                src={thumb}
                                                alt=""
                                            />
                                            <div
                                                className={cx("about__img-sub")}
                                            >
                                                {data &&
                                                    data.images.map(
                                                        (item, index) => {
                                                            return (
                                                                <div
                                                                    onClick={() =>
                                                                        setThumb(
                                                                            item.url
                                                                        )
                                                                    }
                                                                    key={index}
                                                                    className={cx(
                                                                        "img-sub__wrap"
                                                                    )}
                                                                >
                                                                    <img
                                                                        className={cx(
                                                                            "img-sub",
                                                                            {
                                                                                "img-sub--active":
                                                                                    item.url ===
                                                                                    thumb,
                                                                            }
                                                                        )}
                                                                        src={
                                                                            item.url
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={cx({
                                            col: true,
                                            "l-6": true,
                                        })}
                                    >
                                        <div className={cx("info")}>
                                            <h2 className={cx("product__name")}>
                                                {data.name}
                                            </h2>
                                            <div className={cx("evaluate")}>
                                                <div className={cx("stars")}>
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                </div>
                                                <span className={cx("review")}>
                                                    ({data.reviews} customer
                                                    reviews)
                                                </span>
                                            </div>
                                            <p className={cx("price")}>
                                                $
                                                {data.price.toLocaleString(
                                                    "de-DE"
                                                )}
                                            </p>
                                            <p className={cx("description")}>
                                                {data.description}
                                            </p>
                                            <p className={cx("status")}>
                                                Available{" "}
                                                <span>
                                                    {data.stock
                                                        ? "In stock"
                                                        : "Out of stock"}
                                                </span>
                                            </p>
                                            <p className={cx("sku")}>
                                                Sku <span>{data.id}</span>
                                            </p>
                                            <p className={cx("brand")}>
                                                Brand<span>{data.company}</span>
                                            </p>
                                            <div
                                                className={cx("underline")}
                                            ></div>
                                            {data.stock !== 0 && (
                                                <div>
                                                    <p className={cx("color")}>
                                                        Color
                                                        {data.colors.map(
                                                            (item, index) => {
                                                                return (
                                                                    <span
                                                                        onClick={() =>
                                                                            setInfor(
                                                                                (
                                                                                    prev
                                                                                ) => ({
                                                                                    ...prev,
                                                                                    color: item,
                                                                                })
                                                                            )
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        style={{
                                                                            backgroundColor:
                                                                                item,
                                                                        }}
                                                                        className={cx(
                                                                            "check"
                                                                        )}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            style={
                                                                                info.color ===
                                                                                    item && {
                                                                                    display:
                                                                                        "block",
                                                                                }
                                                                            }
                                                                            className={cx(
                                                                                "check-icon"
                                                                            )}
                                                                            icon={
                                                                                faCheck
                                                                            }
                                                                        />
                                                                    </span>
                                                                );
                                                            }
                                                        )}
                                                    </p>
                                                    <div
                                                        className={cx("count")}
                                                    >
                                                        <span
                                                            onClick={() => {
                                                                if (
                                                                    info.num !==
                                                                    1
                                                                ) {
                                                                    setInfor(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            num:
                                                                                prev.num -
                                                                                1,
                                                                        })
                                                                    );
                                                                }
                                                            }}
                                                            className={cx(
                                                                "decrease"
                                                            )}
                                                        >
                                                            -
                                                        </span>
                                                        <span
                                                            className={cx(
                                                                "num"
                                                            )}
                                                        >
                                                            {info.num}
                                                        </span>
                                                        <span
                                                            onClick={() =>
                                                                setInfor(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        num:
                                                                            prev.num +
                                                                            1,
                                                                    })
                                                                )
                                                            }
                                                            className={cx(
                                                                "increase"
                                                            )}
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                    <Link
                                                        to={"/cart"}
                                                        onClick={() =>
                                                            dispatch(
                                                                actions.addData(
                                                                    info
                                                                )
                                                            )
                                                        }
                                                        className={cx(
                                                            "btn__datail"
                                                        )}
                                                    >
                                                        Add to cart
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
