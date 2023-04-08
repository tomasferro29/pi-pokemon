import React from "react";
import { Link } from 'react-router-dom';
import './Landing.css'

export default function Landing() {
    return(
        <div className='landing'>
            <h1 className='landling_title'>Bienvenidos a PokeCodeX!</h1>

            <button><Link to='/home' className='landing_btn'>EMPEZAR</Link></button>
        </div>
    )
}