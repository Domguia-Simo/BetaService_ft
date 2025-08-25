import React,{useState} from 'react'
// import { Link } from 'react-router-dom'
import styles from '../styles/landingStyles.module.css'
import webDev from '../assets/web-dev.png'
import mobileDev from '../assets/mobile-dev.png'
import logoDesign from '../assets/logo-design.png'
import flyerDesign from '../assets/flyer-design.png'
import videoEditing from '../assets/video-editing.png'
import seo from '../assets/seo.png'
    

// video mounting , web development,  logo designs, flyers design, facebook ads, seo, google ads, 3d animation
const services = [
    {
        name:'Video Mounting',
        img:videoEditing
    },
    {
        name:'Web Development',
        img:webDev
    },
    {
        name:'Logo Designs',
        img:logoDesign
    },
    {
        name:'Flyers Design',
        img:flyerDesign
    },
    {
        name:'SEO',
        img:seo
    },
    {
        name:'Mobile Development',
        img:mobileDev
    },
    // {
    //     name:'3D animations',
    //     img:''
    // },
    // {
    //     name:'google ads',
    //     img:''
    // },
    // {
    //     name:'email marketing',
    //     img:''
    // },
    // {
    //     name:'facebook ads',
    //     img:''
    // },
]

const faqs = [
    {
        question:'What is betaService ?!',
        answer:'This is an online mission finder and a project repo or archieve for every one'
    },
    {
        question:'How do i get started ?!',
        answer:'Create an account and apply to missions, upload your project to gain credibility and views'
    },
    {
        question:'Is it only for missions ?!',
        answer:'No, you can get links to various project which will permit you to have usefull feedbacks'
    },
    {
        question:'Can i generate money ?!',
        answer:'Yes, in case of application approuval and upon successful completion of a mission, a commission will be sent to  your account'
    },
    {
        question:'How do i trust a person for a mission ?!',
        answer:'A secure policy have been put in place for that, which prevents any fraud or suspicious activity'
    },
    {
        question:'Do i need to pay ?!',
        answer:'No, the system is completely free of charge, but a small percentage of the mission budget will withdrawn as fee '
    },

]

const LandingPage = () => {

    return(
        <React.Fragment>
            <div className={styles.homePage}>
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

                <div>
                    {/* <h2 style={{color:'black'}}>Explore and Discove a wide variety of Services</h2> */}
                    <div className={styles.serviceContainer}>
                        {services.map((service, idx) => <Service key={idx} name={service.name} img={service.img} />)}
                    </div>
                </div>

                <div>
                    <h3 style={{color:'black'}}>Frequently Asked Questions</h3>
                    <div className={styles.faqContainer}>
                        {faqs.map((faq, idx) => <Faq key={idx} req={faq.question} res={faq.answer}/>)}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LandingPage


const Service = ({name ,img}) => {
    return(
        <div style={{display:'flex' ,flexDirection:'column' ,alignItems:'center'}}>
            <img src={img} className={styles.serviceImg} />
            <span >{name}</span>
        </div>
    )
}

const Faq = ({req ,res}) => {
    const [show , setShow] = useState(false)
    return(
        <div className={styles.faq}>
            <div onClick={()=>setShow(prev => !prev)} style={{cursor:'pointer' ,border:'solid 0px green'}}>
                <span>{req}</span>
            </div>
            <div className={show ? styles.faqAnswerOpen : styles.faqAnswer} >{res}</div>
        </div>
    )
}