import classNames from "classnames/bind";

import styles from "./About.module.scss";
import { NavHome } from "../../component/layout/components";

const cx = classNames.bind(styles);

function About() {
    return (
        <div className={cx("wrapper", { grid: true })}>
            <NavHome />
            <div className={cx({ grid: true, wide: true })}>
                <div className={cx("container", { row: true })}>
                    <div
                        className={cx("img__wrap", { col: true, "l-6": true })}
                    >
                        <img
                            className={cx("image")}
                            src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg"
                        />
                    </div>
                    <div className={cx({ col: true, "l-6": true })}>
                        <div className={cx("about")}>
                            <h1 className={cx("about__history")}>Our Story</h1>
                            <div className={cx("underline")}></div>
                            <p className={cx("about__description")}>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Fugiat accusantium sapiente
                                tempora sed dolore esse deserunt eaque
                                excepturi, delectus error accusamus vel
                                eligendi, omnis beatae. Quisquam, dicta. Eos
                                quod quisquam esse recusandae vitae neque
                                dolore, obcaecati incidunt sequi blanditiis est
                                exercitationem molestiae delectus saepe odio
                                eligendi modi porro eaque in libero minus unde
                                sapiente consectetur architecto. Ullam rerum,
                                nemo iste ex, eaque perspiciatis nisi, eum totam
                                velit saepe sed quos similique amet. Ex,
                                voluptate accusamus nesciunt totam vitae esse
                                iste.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
