import React from 'react';
import s from './Preloader.module.css';
import preloaderImg from './tail-spin.svg'

type PropsType = {
   height?: string
}
const Preloader: React.FC<PropsType> = ({height}) => {

   let heightValue
   if (!height) {
      heightValue = '100%'
   } else {
      heightValue = height + 'px'
   }

    return (
        <div className={s.preloader_container} style={{'height': heightValue}}>
            <img src={preloaderImg} alt="" />
        </div>
    )
}

export default Preloader;