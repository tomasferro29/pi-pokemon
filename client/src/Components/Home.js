import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPokemons, getTypes, filterPokemonsByTypes, filterPokemonsByOrigin, orderByName, orderByAttack } from "../Actions/index.js";
import Card from './Card.js'
import Paginado from './Paginado.js'
import SearchBar from "./SearchBar.js";
import './Home.css'

export default function Home(){
    // traer pokemons y types (1)
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.types)
    // estado local para ordenamiento por nombre
    const [order, setOrder] = useState('')
    // estado local para el paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [pokePerPage, setPokePerPage] = useState(12)
    const indexOfLast = currentPage * pokePerPage 
    const indexOfFirst = indexOfLast - pokePerPage
    const currentPokemons = allPokemons.length > 1 ? allPokemons.slice(indexOfFirst, indexOfLast) : allPokemons
    // manejo del paginado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // traer pokemons y types (2)
    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])
    
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])
    
    function handleRefresh(e){
        e.preventDefault()
        dispatch(getPokemons())
        dispatch(getTypes())
    }
    
    function handleFilter(e){
        e.preventDefault()
        dispatch(filterPokemonsByTypes(e.target.value))
        setCurrentPage(1)
    }

    function handleOrigin(e){
        e.preventDefault()
        dispatch(filterPokemonsByOrigin(e.target.value))
        setCurrentPage(1)
    }

    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}` )
    }

    function handleSortAttack(e) {
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    
    return(
        <div className='home'>
            <h1>PokeCodeX</h1>  
            <SearchBar />
            <Link to='/create' className='crear' >Crear Pokemon</Link>
            <button onClick={(e) => handleRefresh(e)} className='refrescar'>Refrescar</button>
            
            <div className='ordenamiento'>
                <div className='alfabetico'>
                <label>a-z / z-a:</label><br/>
                    <select onChange={e => handleSort(e)}>
                        <option value='elegir'>Elegir</option>
                        <option value='desc'>Z-A</option>
                        <option value='asc'>A-Z</option>
                    </select>
                </div>
                <div className='ataque'>
                <label>Ataque:</label><br/>
                    <select onChange={e => handleSortAttack(e)}>
                        <option value='elegir'>Elegir</option>
                        <option value='asc'>Descendente</option>
                        <option value='desc'>Ascendente</option>
                    </select>
                </div>
            </div>
            <div className='filtrado'> 
                <div className='origen'>
                    <label>Origen:</label><br/>
                    <select onChange={e => handleOrigin(e)}>
                        <option value='all'>Todos</option>  
                        <option value='api'>Existente</option>
                        <option value='db'>Creado</option>
                    </select>
                </div>
                <div className='tipos' onChange={e => { handleFilter(e) }}>
                    <label>Tipos:</label><br/>
                    <select >
                        <option value='all'>Todos</option>
                        {
                            allTypes && allTypes.map( t => {
                                let firstUp = t.name[0].toUpperCase()
                                let restLow = t.name.slice(1)
                                return( 
                                    <option key={t.id} value={t.name}>{firstUp.concat(restLow)}</option>
                                )
                                // firstUp.concat(restLow)
                            })
                        }
                    </select>
                </div>
            </div>
            <Paginado 
                pokePerPage={pokePerPage}  
                allPokemons={allPokemons.length}
                paginado={paginado} 
            />
            {
            currentPokemons && currentPokemons.map( (p) => {
                return (
                <div className='cartas'>
                    <Link to={'/home/' + p.id} id={p.id} name={p.name}>
                        <Card name={p.name} 
                        speed={p.speed}
                        key={p.name}
                        id={p.id}  image={p.image} attack={p.attack} types={
                            p.types && p.types.map(t => 
                                <div>{t.toUpperCase()}</div> ) }
                        />
                    </Link>
                </div>
                )
                
            }) 
            }

            <Paginado 
                pokePerPage={pokePerPage}  
                allPokemons={allPokemons.length}
                paginado={paginado} 
            />
            <div className='fondo'></div>
            <div className='izquierda'></div>
            <div className='derecha'></div>
            <div className='arriba'></div>

        </div>
    )
}