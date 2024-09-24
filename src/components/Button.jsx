import React, { useState } from 'react'
import styles from '../style'

const Button = ({ isDark, changeColorTheme }) => {
  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div 
        className="z-50 font-poppins fixed w-16 h-16 bottom-16 right-16 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-semibold text-center cursor-pointer" 
        onClick={changeColorTheme}
      >
        <p className="mt-5">{isDark ? "Dark" : "Light"}</p>
      </div>
    </div>
  );
}

export default Button
