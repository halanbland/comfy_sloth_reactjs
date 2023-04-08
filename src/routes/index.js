import Home from "../pages/Home";
import Product from "../pages/Product";
import About from "../pages/About";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";

const publicRoutes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "/products",
        component: Product,
    },
    {
        path: "/checkout",
        component: Checkout,
    },
    {
        path: "/cart",
        component: Cart,
    },
    {
        path: "/products/:id",
        component: ProductDetail,
    },
];

export default publicRoutes;
