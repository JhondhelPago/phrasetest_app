import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style";


//importing component
import { Navbar } from "../components";
const Assessment = () => {

    const navigate = useNavigate();

    return (
        <>
            <section className='bg-white dark:bg-primary w-full overflow-visible'>
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>

                <h1>This is Assessment page</h1>
            </section>
        </>
    )

}


export default Assessment;