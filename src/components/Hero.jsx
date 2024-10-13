import styles from '../style';
import {sitinginchair} from '../assets';
import GetStarted from './GetStarted';

const Hero = () => (
    <section id="home" className={`flex md:flex-row flex-col dark:text-primary dark:bg-primary ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart}
      flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <p className={`${styles.paragraph} ml-2`}>
          Refine your vocabulary and express with precision.
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[29px] text-[19px] text-primary dark:text-white ss:leading-[100px] leading-[75px]">
          By broadening your word  choices <br className="sm:block hidden" /> 
          and correcting usage, <br className="sm:block hidden" /> {" "} 
          <span className="text-gradient"></span>
          you can <span className="text-gradient">express yourself</span> with greater <br className="sm:block hidden" /> {" "} 
          precision and impact.
          </h1>
        </div>

        <div className="ss:flex hidden md:mr-4 mr-0">
        <GetStarted />
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-primary dark:text-white ss:leading-[100px] leading-[75px] w-full"></h1>
        <p className={`${styles.paragraph} max-w-[500px] mt-5 text-primary dark:text-white`}> Craft messages that captivate and persuade by expanding your vocabulary and applying refined language techniques, ensuring your communication is both precise and influential.</p>
      </div>
      <div className="relative flex-1 flex items-center justify-center">
          <img src={sitinginchair} alt="sitinginchair" className="w-[100%] h-[100%] relative z-[5]"/>
          <div className="absolute z-[1] w-[40%] h-[50%] middle-0 blue__gradient"/>
          <div className="absolute z-[2] w-[30%] h-[30%] middle-0 white__gradient"/>
          <div className="absolute z-[1] w-[20%] h-[20%] middle-0 blue__gradient"/>
        </div>

        <div className={`ss:hidden ${styles.flexCenter}`}> 
          <GetStarted/>
        </div>
    </section>
  )


export default Hero
