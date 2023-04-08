import classNames from "classnames/bind";

import styles from "./Product.module.scss";
import NavHome from "../../component/layout/components/NavHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faList,
    faSearch,
    faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import fetchData from "../../apis";

const cx = classNames.bind(styles);
function Product() {
    const [data, setData] = useState([]);
    const [currData, setCurrData] = useState([]);
    const [search, setSearch] = useState("");
    const [price, setPrice] = useState(309999);
    const [checked, setChecked] = useState(false);
    const [currCompany, setCurrCompany] = useState();
    const [currCategory, setCurrCategory] = useState();
    const [currColor, setCurrColor] = useState();
    const [sort, setSort] = useState("lowest");
    const [color, setColor] = useState([
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#000",
        "#ffb900",
    ]);
    const [totalCategory, settotalCategory] = useState([
        "office",
        "living room",
        "kitchen",
        "bedroom",
        "dining",
        "kids",
    ]);

    // api
    useEffect(() => {
        fetchData(setData, setCurrData);
    }, []);

    // condition
    const condition = () => {
        let inputData;
        let companyData;
        let categoryData;
        let colorData;
        let priceData;
        let freeshipData;
        let newData = [];
        if (search) {
            inputData = data.filter((item) => item.name.includes(search));
            newData.push(inputData);
        }
        if (currCompany) {
            if (currCompany === "all") {
                companyData = data;
            } else {
                companyData = data.filter(
                    (item) => item.company === currCompany
                );
            }
            newData.push(companyData);
        }
        if (currColor) {
            if (typeof currColor === "object") {
                colorData = data;
            } else {
                colorData = data.filter((item) =>
                    item.colors.includes(currColor)
                );
            }
            newData.push(colorData);
        }
        if (currCategory) {
            if (typeof currCategory === "object") {
                categoryData = data;
            } else {
                categoryData = data.filter(
                    (item) => item.category === currCategory
                );
            }
            newData.push(categoryData);
        }
        if (price) {
            priceData = data.filter((item) => item.price <= price);
            newData.push(priceData);
        }
        if (checked) {
            if (checked) {
                freeshipData = data.filter((item) => item.shipping);
            } else {
                freeshipData = data;
            }
            newData.push(freeshipData);
        }
        let array = data.filter((ele) => {
            return newData.every((item) =>
                item.find((item) => item.id === ele.id)
            );
        });

        // sort
        let a = [];
        let mainArr = [];
        if (sort) {
            if (sort === "lowest") {
                for (let i = 0; i < array.length; i++) {
                    a.push(array[i]["price"]);
                }
                a.sort((a, b) => a - b);
                let b = Array.from(new Set(a));
                for (let i = 0; i < b.length; i++) {
                    let arrSub = array.filter((item) => item.price === b[i]);
                    mainArr = [...mainArr, ...arrSub];
                }
            }
            if (sort === "hightest") {
                for (let i = 0; i < array.length; i++) {
                    a.push(array[i]["price"]);
                }
                a.sort((a, b) => b - a);
                let b = Array.from(new Set(a));
                for (let i = 0; i < b.length; i++) {
                    let arrSub = array.filter((item) => item.price === b[i]);
                    mainArr = [...mainArr, ...arrSub];
                }
            }
            if (sort === "a-z") {
                for (let i = 0; i < array.length; i++) {
                    a.push(array[i]["name"]);
                }
                a.sort();
                let b = Array.from(new Set(a));
                for (let i = 0; i < b.length; i++) {
                    let arrSub = array.filter((item) => item.name === b[i]);
                    mainArr = [...mainArr, ...arrSub];
                }
            }
            if (sort === "z-a") {
                for (let i = 0; i < array.length; i++) {
                    a.push(array[i]["name"]);
                }
                a.sort((a, b) => b.localeCompare(a));
                let b = Array.from(new Set(a));
                for (let i = 0; i < b.length; i++) {
                    let arrSub = array.filter((item) => item.name === b[i]);
                    mainArr = [...mainArr, ...arrSub];
                }
            }
        }

        setCurrData(mainArr);
    };

    // search
    useEffect(condition, [search]);

    // filter category
    const handleCategory = (category) => {
        setCurrCategory(category);
    };
    const handleAllCate = () => {
        setCurrCategory([]);
    };

    useEffect(condition, [currCategory]);

    // filter company
    const handleCompany = (e) => {
        setCurrCompany(e.target.value);
    };

    useEffect(condition, [currCompany]);

    // filter colors
    const handleColor = (color) => {
        setCurrColor(color);
    };

    const handleAllColor = () => {
        setCurrColor([]);
    };

    useEffect(condition, [currColor]);

    // filter price
    const handlePrice = (e) => {
        setPrice(parseInt(e.target.value));
    };
    useEffect(condition, [price]);

    // filter Freeship
    const handleFreeShip = (e) => {
        setChecked(!checked);
    };

    useEffect(condition, [checked]);

    // Sort
    useEffect(condition, [sort]);

    // clear
    const clearFilter = () => {
        setPrice(309999);
        setSearch("");
        setCurrColor();
        setCurrCategory("");
        setCurrCompany("all");
        setChecked(false);
    };

    return (
        <div className={cx("wrapper", { grid: true })}>
            {currData && (
                <div>
                    <NavHome />
                    <div
                        className={cx({
                            grid: true,
                            wide: true,
                        })}
                    >
                        <div className={cx("container", { row: true })}>
                            <div
                                className={cx({
                                    col: true,
                                    "l-3": true,
                                    "m-3": true,
                                    "c-0": true,
                                })}
                            >
                                <div className={cx("sidebar")}>
                                    <input
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        value={search}
                                        placeholder="Search"
                                        className={cx("search__input")}
                                    />
                                    <div className={cx("category")}>
                                        <h4 className={cx("category__title")}>
                                            Category
                                        </h4>
                                        <ul className={cx("category__list")}>
                                            <li>
                                                <button
                                                    onClick={handleAllCate}
                                                    className={cx(
                                                        "category__list-item"
                                                    )}
                                                >
                                                    All
                                                </button>
                                            </li>
                                            {totalCategory.map(
                                                (item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <button
                                                                onClick={() =>
                                                                    handleCategory(
                                                                        item
                                                                    )
                                                                }
                                                                className={cx(
                                                                    "category__list-item"
                                                                )}
                                                            >
                                                                {item}
                                                            </button>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                    <div className={cx("company")}>
                                        <h4 className={cx("company__title")}>
                                            Companny
                                        </h4>
                                        <select
                                            value={currCompany}
                                            onChange={handleCompany}
                                            className={cx("company__select")}
                                        >
                                            <option
                                                value={"all"}
                                                className={cx(
                                                    "company__select-option"
                                                )}
                                            >
                                                all
                                            </option>
                                            <option
                                                value={"marcos"}
                                                className={cx(
                                                    "company__select-option"
                                                )}
                                            >
                                                marcos
                                            </option>
                                            <option
                                                value={"liddy"}
                                                className={cx(
                                                    "company__select-option"
                                                )}
                                            >
                                                liddy
                                            </option>
                                            <option
                                                value={"ikea"}
                                                className={cx(
                                                    "company__select-option"
                                                )}
                                            >
                                                ikea
                                            </option>
                                            <option
                                                value={"caressa"}
                                                className={cx(
                                                    "company__select-option"
                                                )}
                                            >
                                                caressa
                                            </option>
                                        </select>
                                    </div>
                                    <div className={cx("colors")}>
                                        <h4 className={cx("colors__title")}>
                                            Colors
                                        </h4>
                                        <ul className={cx("colors__list")}>
                                            <li className={cx("colors__all")}>
                                                <button
                                                    onClick={handleAllColor}
                                                    className={cx(
                                                        "category__list-item"
                                                    )}
                                                >
                                                    All
                                                </button>
                                            </li>
                                            {color.map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        onClick={() =>
                                                            handleColor(item)
                                                        }
                                                        className={cx(
                                                            "colors__list-item"
                                                        )}
                                                        style={{
                                                            backgroundColor:
                                                                item,
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            style={
                                                                currColor ===
                                                                    item && {
                                                                    display:
                                                                        "inline-block",
                                                                }
                                                            }
                                                            className={cx(
                                                                "color__list-icon"
                                                            )}
                                                            icon={faCheck}
                                                        />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <div className={cx("price")}>
                                        <h4 className={cx("price__title")}>
                                            price
                                        </h4>
                                        <div className={cx("price__content")}>
                                            <p className={cx("price__curr")}>
                                                ${price.toLocaleString("de-DE")}
                                            </p>
                                            <input
                                                onChange={(e) => handlePrice(e)}
                                                type="range"
                                                min="0"
                                                max="309999"
                                                step="1"
                                                value={price}
                                                className={cx("price__change")}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx("free-shipping")}>
                                        <div
                                            className={cx(
                                                "free-shipping__wrap"
                                            )}
                                        >
                                            <span
                                                className={cx(
                                                    "free-shipping__title"
                                                )}
                                            >
                                                Free Shipping
                                            </span>
                                            <input
                                                checked={checked}
                                                onChange={handleFreeShip}
                                                type="checkbox"
                                                className={cx(
                                                    "free-shipping__check"
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={clearFilter}
                                        className={cx("clear-filter__btn")}
                                    >
                                        Clear filter
                                    </button>
                                </div>
                            </div>

                            <div
                                className={cx({
                                    col: true,
                                    "l-9": true,
                                    "m-9": true,
                                    "c-12": true,
                                })}
                            >
                                <div className={cx("content")}>
                                    <div className={cx("fitler")}>
                                        <div className={cx("filter__display")}>
                                            <FontAwesomeIcon
                                                icon={faSquare}
                                                className={cx(
                                                    "filter__display-full"
                                                )}
                                            />
                                            <FontAwesomeIcon
                                                icon={faList}
                                                className={cx(
                                                    "filter__display-list"
                                                )}
                                            />
                                        </div>
                                        <span className={cx("filter__num")}>
                                            {currData.length} Products Found
                                        </span>
                                        <div className={cx("line")}></div>
                                        <div className={cx("filter__type")}>
                                            <span>Sort by</span>
                                            <select
                                                value={sort}
                                                onChange={(e) =>
                                                    setSort(e.target.value)
                                                }
                                                className={cx("select-type")}
                                            >
                                                <option value="lowest">
                                                    Price (lowest)
                                                </option>
                                                <option value="hightest">
                                                    Price (hightest)
                                                </option>
                                                <option value="a-z">
                                                    Name (A - Z)
                                                </option>
                                                <option value="z-a">
                                                    Name (Z - A)
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <ul
                                        className={cx("product__list", {
                                            row: true,
                                        })}
                                    >
                                        {currData.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={cx({
                                                        col: true,
                                                        "l-4": true,
                                                        "m-6": true,
                                                        "c-12": true,
                                                    })}
                                                >
                                                    <li
                                                        className={cx(
                                                            "product__list-item"
                                                        )}
                                                    >
                                                        <div
                                                            className={cx(
                                                                "product__list-item-wrap"
                                                            )}
                                                        >
                                                            <img
                                                                className={cx(
                                                                    "product__list-item-img"
                                                                )}
                                                                src={item.image}
                                                            />
                                                            <Link
                                                                to={`/products/${item.id}`}
                                                                className={cx(
                                                                    "product__list-item-link"
                                                                )}
                                                            >
                                                                <FontAwesomeIcon
                                                                    className={cx(
                                                                        "product__list-item-icon"
                                                                    )}
                                                                    icon={
                                                                        faSearch
                                                                    }
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                "product__detail"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "product__detail-name"
                                                                )}
                                                            >
                                                                {item.name}
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    "product__detail-price"
                                                                )}
                                                            >
                                                                $
                                                                {item.price.toLocaleString(
                                                                    "de-DE"
                                                                )}
                                                            </span>
                                                        </div>
                                                    </li>
                                                </div>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Product;
