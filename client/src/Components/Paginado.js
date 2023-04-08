import React from "react";
import './Paginado.css'


export default function Paginado({pokePerPage, allPokemons, paginado}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allPokemons / pokePerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav className='paginado'>
            <div className='paginado'>
                {
                    pageNumbers && pageNumbers.map ( pN => {
                        return (
                        <div key='pN'>
                            <button onClick={() => paginado(pN)} className='pagina' >{pN}</button>
                        </div>
                            )
                    })
                }
            </div>
        </nav>
    )

}