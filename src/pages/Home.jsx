import React from 'react'
// import { Link } from 'react-router-dom'
import styles from '../styles/landingStyles.module.css'

const LandingPage = () => {

    return(
        <React.Fragment>
            <div style={{minHeight:'90vh'}}>
                <div className={styles.block1}>
                    <span className={styles.title1} >Unleash Your <span style={{color:'purple'}}> Creativity </span></span>
                    <span className={styles.title2} >Join a community of innovators and creators.<br/> Share your projects, collaborate on missions, <br/> and bring your ideas to life</span>
                    <span><br/>
                    <div>
                        <button className={styles.btn2} >Explore</button>&nbsp;&nbsp;
                        <button className={styles.btn}>Get Started</button>
                    </div>
                    </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LandingPage
