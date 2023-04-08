import classNames from "classnames/bind";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import styles from "./App.module.scss";
import DefaultLayout from "./component/layout/DefaultLayout";
import publicRoutes from "./routes";

const cx = classNames.bind(styles);

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        let Page = route.component;
                        if (route.layout) {
                            Layout = route.layout;
                            console.log(Layout);
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Layout>{<Page />}</Layout>}
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
