import React from 'react';
import s from './Preloader.module.css';
import preloaderImg from './tail-spin.svg'

const Preloader = () => {
    return (
        <div className={s.preloader_container}>
            <img src={preloaderImg} alt="" />
        </div>
    )
}

export default Preloader;