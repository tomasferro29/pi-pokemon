import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({ type: 'GET_POKEMONS', payload: await json.data })
    }
}

export function getTypes(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/types')
        return dispatch({ type: 'GET_TYPES', payload: json.data})
    }
}


export function filterPokemonsByTypes(payload){
    return {
        type: 'FILTER_POKEMONS_BY_TYPES',
        payload
    }
}

export function filterPokemonsByOrigin(payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

export function getNamePokemons(payload) {
    return {
        type: 'GET_NAME_POKEMONS',
        payload
    }
}

export function showDetail(id){
    return async function (dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
            return dispatch({ type: 'SHOW_DETAIL', payload: json.data})
        } catch(e){
            console.log(e + 'Hubo un error, intenta buscando un pokemon distinto')
        }
    }
}

export async function postPokemon(payload) {
    // console.log('LLEGO A LA ACTION: ' + payload.name)
    const newPokemon = await axios.post('http://localhost:3001/pokemons' , payload)
    // console.log('EJECUTO EL POST: ' + newPokemon.data)
    return  newPokemon
    
}

export function emptyState() {
    return {
        type: 'EMPTY_STATE'
    }
}