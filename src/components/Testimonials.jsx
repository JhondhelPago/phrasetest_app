import { feedback } from "../constants"
import styles from '../style';
import FeedbackCard from './FeedbackCard';

const Testimonials = () => (
  <section id= "clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient"/>
    <div className="absolute z-[0] w-[30%] h-[30%] -right-[50%] rounded-full white__gradient"/>
    <div className="absolute z-[0] w-[10%] h-[10%] -right-[50%] rounded-full white__gradient"/>

    <div/>

      <div className="w-full flex justify-evenly items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1] text-primary dark:text-white">
      <h1 className={`${styles.heading2} text-center text-primary dark:text-white`}> <p className="text-primary dark:text-white">About Us</p></h1>
      <div className="w-full md:mt-0 mt- flex justify-evenly">
        <p className={`${styles.paragraph} text-left max-w-[450px] text-primary dark:text-white`}><p className="text-center justify-evenly items-center md:items-center">Refining your vocabulary turns your words into tools of precision, transforming communication from mere expression to genuine impact.</p></p>
      </div>
    </div>

    <div className="flex flex-wrap sm:justify-center justify-center w-full feedback-cointainer relative z-[1] ">
      {feedback.map((card) => (
        <FeedbackCard key={card.id} {...card}/>
      ))}
    </div>
  </section>

  )

export default Testimonials
