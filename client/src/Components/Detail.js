import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showDetail, emptyState } from "../Actions";
import { Link } from "react-router-dom";
import './Detail.css'

export default function Detail(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const pokeDetail = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(showDetail(id))
    }, [dispatch]);

    function handleBack() {
        dispatch(emptyState())
    }

    return (
        
    <div className='detail'>
       
        {
            pokeDetail.name ?
            <div>
                <h1>ESTE ES: {pokeDetail.name.toUpperCase()}</h1>
                <img src={pokeDetail.image}  alt='image not found :(' width='200px' height='250px'></img>
                <div className='detalles'>
                    <p>HEIGHT:  {pokeDetail.height}</p>
                    <p>WEIGHT:  {pokeDetail.weight}</p>
                    <p>HP:  {pokeDetail.hp}</p>
                    <p>ATTACK:  {pokeDetail.attack}</p>
                    <p>DEFENSE: {pokeDetail.defense}</p>
                    <p>SPEED:   {pokeDetail.speed}</p>
                </div>
                <div className='tipos'><h5> {pokeDetail.types ? pokeDetail.types.map( t => <h4 key={t.indexOf()}>{t.toUpperCase()}</h4>) : 'Este Pokemon no tiene tipo'}</h5></div>
            </div>
                : 'Loading...'
        }
         <Link to='/home'><button onClick={() => handleBack() } className='volver'>Volver</button></Link>
            
    </div>        
    );

};