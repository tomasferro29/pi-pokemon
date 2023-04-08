import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import './Create.css'

function validate(input) {
    let errors = {}
    if(!input.name){
        errors.name = 'Se requiere un Nombre'
    } else if (
        input.height > 150 ||
        input.weight > 150 || 
        input.hp > 150 ||
        input.attack > 150 ||
        input.defense > 150 ||
        input.speed > 150 ) {
        errors.numbers = 'Los valores no deben superar los 150!'
    }
    return errors
}

export default function Create(){

    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        image: '',
        types: []
    })

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    const handleChange = (e) => {
        console.log(e.target.name + ': ' + e.target.value)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('SUBMITED: ' + input.name)
        dispatch(postPokemon(input))
        alert('Pokemon creado con éxito')
        setInput({
            name: '',
            height: '',
            weight: '',
            attack: '',
            defense: '',
            hp: '',
            image: '',
            types: []
        })
        history.push('/home')
    }

    // async function postPokemon(userData){
    //     try {
    //         await fetch(
    //             "http://localhost:3001/pokemons",
    //             {
    //               method: "POST",
    //               headers: {
    //                 "Content-Type": "application/json",
    //               },
    //               body: JSON.stringify(userData),
                  
    //             },
    //             alert("Pokemon creado correctamente!"),
            
    //           );
        
    //     } catch (error) {
    //         console.log(error);
    //         alert("Complete todos los campos");
    //     }
    // }

    return(
        <div className='create'>
            <h1>CREA TU POKEMON!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type='text' value={input.name} name='name' onChange={handleChange}/>
                        {errors.name && (
                            <p className='error'>{errors.name} 💢</p> 
                        )}
                    
                </div>
                <div>
                    <label>Altura</label>
                    <input type='number' value={input.height} name='height' onChange={handleChange}></input>
                    
                </div>
                <div>
                    <label >Peso</label>
                    <input className='peso' type='number' value={input.weight} name='weight' onChange={handleChange}></input>
                   
                </div>
                <div>
                    <label >Velocidad</label>
                    <input className='speed' type='number' value={input.speed} name='speed' onChange={handleChange}></input>
                   
                </div>
                <div>
                    <label>Ataque</label>
                    <input type='number' value={input.attack} name='attack' onChange={handleChange}></input>
                    
                </div>
                <div>
                    <label className='defensa'>Defensa</label>
                    <input  type='number' value={input.defense} name='defense' onChange={handleChange}></input>
                    
                </div>
                <div>
                    <label>Salud</label>
                    <input type='number' value={input.hp} name='hp' onChange={handleChange}></input>
                    {errors.numbers && (
                            <p className='errors'>{errors.numbers} 💢 </p>
                        )}
                </div>
                <div>
                    <label>Imagen</label>
                    <input type='text' value={input.image} name='image' onChange={handleChange}></input>
                </div>
                <div>
                    <label>Tipos</label>
                    <select onChange={(e) => handleSelect(e)}>
                        {
                            types && types.map( t => {
                                let firstUp = t.name[0].toUpperCase()
                                let restLow = t.name.slice(1)
                                return (
                                    <option 
                                    key={t.id} 
                                    value={t.name}>
                                        {firstUp.concat(restLow)}
                                        </option>
                                        )
                                    })
                                }
                    </select>
                    <ul>{input.types.map( t => {
                        let firstUp = t[0].toUpperCase()
                        let restLow = t.slice(1)
                        return (
                            <div>
                            <li>{firstUp.concat(restLow)}</li>
                            </div>
                        )})}</ul>
                </div>
                <button type='submit' className='create_button'>Crear Pokemon</button>
            </form>
            <Link to='/home'><button className='back_button'>Volver</button></Link>
        </div>
    )
}