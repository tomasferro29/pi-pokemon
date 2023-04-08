import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { getNamePokemons } from '../Actions';
import './SearchBar.css';


export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNamePokemons(name))
        setName('')
    }

    return (
        <div className='search-nav'>
            <nav className='searchbar'>
                <input 
                onChange={(e) => handleInputChange(e)}
                type='text'
                placeholder='Buscar...'
                />
                <button 
                type='submit'
                onClick={(e) => handleSubmit(e)}
                >Buscar
                </button>
            </nav>
        </div>
    )
}