const { Router, response } = require('express');
const axios = require('axios')
const { Pokemon, Type } = require('../db.js')
// const { conn } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getPokemons = async () => {
    let page1 = await axios.get('https://pokeapi.co/api/v2/pokemon')
    let pokemons1 = await page1.data.results.map( async (p) => {
        return await axios.get(p.url)
        .then(r => {

            return { 
                id: r.data.id,
                name: r.data.name,
                types: r.data.types.map ( t => t.type.name),
                image: r.data.sprites.front_default,
                height: r.data.height,
                weight: r.data.weight,
                hp: r.data.stats[0].base_stat,
                attack: r.data.stats[1].base_stat,
                defense: r.data.stats[2].base_stat,
                speed: r.data.stats[5].base_stat,
            }})} )
    let page2 = await axios.get(page1.data.next)
    let pokemons2 = await page2.data.results.map( async (p) => {
        return await axios.get(p.url)
        .then(r => {
            return { 
                id: r.data.id,
                name: r.data.name,
                types: r.data.types.map ( t => t.type.name),
                image: r.data.sprites.front_default,
                height: r.data.height,
                weight: r.data.weight,
                hp: r.data.stats[0].base_stat,
                attack: r.data.stats[1].base_stat,
                defense: r.data.stats[2].base_stat,
                speed: r.data.stats[5].base_stat,
            }})} )
    let allPokemons = await pokemons1.concat(pokemons2)
    return Promise.all(allPokemons)
}

const getTypes = async () => {
    return axios.get('https://pokeapi.co/api/v2/type')
    .then(response => response.data.results.map((type => type.name)))
}

router.get('/pokemons', async (req, res) => {
    const name = req.query.name
    let pokemons = await getPokemons()
    let dbPokemons = await Pokemon.findAll(
        {
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    }
    )
    let allPokemons = [...pokemons, dbPokemons]
    
    if (name) {
            let foundPokemonName = allPokemons.flat().find( p => p.name === name.toLowerCase() )
            foundPokemonName ?
            res.status(200).send(foundPokemonName) :
            res.status(404).send('No se encontró el Pokemon buscado')
        } else {        
            try {
                res.status(200).send(allPokemons.flat())
            } catch (e) {
                res.status(404).send('Hubo un error en la obtencion de los datos')
            }
        }   
})

router.get('/pokemons/:id', async (req, res) => {
    const id = req.params.id
    let pokemons = await getPokemons()
    let dbPokemons = await Pokemon.findAll()
    let allPokemons = [...pokemons, dbPokemons].flat()

        let foundPokemonApi = allPokemons.find(p => p.id === parseInt(id))
        let foundPokemonDb = allPokemons.find( p => p.id === id )
        if ( id.length < 36 ) {
            foundPokemonApi ?
                res.status(200).json(foundPokemonApi) :
                res.status(404).send('No se encontro el pokemon buscado')
        } else if ( id.length === 36 ) {
            foundPokemonDb ?
                res.status(200).send(foundPokemonDb) :
                res.status(404).send('No se encontro el pokemon buscado')
        }
})

router.get('/types', async (req, res) => {
    const types = await getTypes()

    // if ( Type.length > 0 ) Type.findAll()
    try {
        await types.forEach(async (t) => {
        Type.findOrCreate({
            where: {name: t}
            })
        })
        const allTypes = await Type.findAll()
        res.status(200).send(allTypes)
    } catch (e) {
        res.status(404).send('Hubo un error al obtener los datos')
    }
})

router.post('/pokemons', async (req, res) => {
    const {name,hp,attack,defense,speed,height,weight} = req.body
    console.log('body ruta post: ' + req.body.name)
    const newPokemon = await Pokemon.findOrCreate({
        where: {name: name.toLowerCase(),
            hp,attack,defense,speed,height,weight}
    })

    res.status(200).send('Pokemon creado correctamente!')
})

module.exports = router;
