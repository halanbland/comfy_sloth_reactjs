import classNames from "classnames/bind";

import { Header, Footer } from "../components";
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
