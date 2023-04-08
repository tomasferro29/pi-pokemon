import React from "react";
import './Card.css'

export default function Card({name, image, types,speed}){

    return (
        <div className='card'>
            <h3>{name.toUpperCase()}</h3>
            <img src={image} alt='image not found :(' width='200px' height='250px' />
            <div className='sombra'></div>
            {/* <h4>{attack ? attack : 'No se encontró el ataque' }</h4> */}
            <h4>Speed: {speed}</h4>
            <p>Tipo/s</p> 
            <h5>{types ? types : 'Este Pokemon no tiene tipo'}</h5>
        </div>
    )
}

