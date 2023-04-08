const initialState = {
    pokemons: [],
    allPokemons: [],    // aca estan todos los pokemons sin alterarse
    types: [],
    detail: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'FILTER_POKEMONS_BY_TYPES':
            let thePokemons = state.allPokemons
            
            let pokemonsFiltered =
                action.payload === 'all' ?
                    thePokemons :
                    thePokemons.filter( (p) => { return  p.types.includes(action.payload) })
            return {
                ...state,
                pokemons: pokemonsFiltered
            }
        case 'FILTER_BY_ORIGIN':
            let pokes = state.allPokemons
            let pokeFilter = ''
            if (action.payload === 'all'){
                pokeFilter = pokes
            } else if (action.payload === 'db'){
                pokeFilter = pokes.filter( p => p.createdInDatabase === true ) 
            } else {
                pokeFilter = pokes.filter( p => p.createdInDatabase !== true )
            }
            return {
                ...state,
                pokemons: pokeFilter
            }
        case 'ORDER_BY_NAME':
            let orderNames = state.allPokemons
            if ( action.payload === 'elegir' ){
                orderNames = state.allPokemons
            } else 
            if ( action.payload === 'desc' ){
                orderNames = state.pokemons.sort(function(a,b) {
                    if (a.name < b.name) return 1
                    if (a.name > b.name) return -1
                    return 0
                })
            } else {
                orderNames = state.pokemons.sort(function(a, b) {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                })
                
            }
            return {
                ...state,
                pokemons: orderNames
            }

        case 'ORDER_BY_ATTACK':
            let orderAttack = state.allPokemons
            if ( action.payload === 'elegir' ){
                orderAttack = state.allPokemons
            } else if ( action.payload === 'asc' ){
                orderAttack = state.pokemons.sort(function(a,b) {
                    if (a.attack > b.attack) return -1
                    if (a.attack < b.attack) return 1
                    return 0
                })
            } else {
                orderAttack = state.pokemons.sort(function(a,b) {
                    if (a.attack > b.attack) return 1
                    if (a.attack < b.attack) return -1
                    return 0
                })
                
            }
            return {
                ...state,
                pokemons: orderAttack
            }
        case 'GET_NAME_POKEMONS' :            

            let pokemons1 = state.allPokemons
            let pokeFound = pokemons1.filter( p => p.name === action.payload)
            
            return {
                ...state,
                pokemons: pokeFound 
            }
        case 'SHOW_DETAIL' :
            console.log(action.payload.name)
            return {
                ...state, 
                detail: action.payload
            }
        case 'POST_POKEMON' :
            
            // console.log('LLEGO AL REDUCER: ' + action.payload.name)
            return {
                ...state,
                // pokemons: [...state.pokemons, action.payload]
            }
        case 'EMPTY_STATE' : 
            return {
                ...state,
                detail: []
            }

        default: return state
    }
}

export default rootReducer