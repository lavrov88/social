import React from "react";
import s from "./Button.module.css"

type PropsType = {
   type?: string
   text: string
   action?: () => void
   submit?: boolean
}

const Button: React.FC<PropsType> = ({type, text, action, submit}) => {
   let style
   if (type === 'normal' || !type) {
      style = s.btn_normal
   } else if (type === 'danger') {
      style = s.btn_danger
   } else if (type === 'white') {
      style = s.btn_white
   }

   return (
      <button 
         className={style}
         onClick={action}
         type={submit ? 'submit' : 'button'}
      >{text}</button>
   )
}

export default Button