const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
          const message = 'le pokemon demandé n\'existe pas. Réessayer avec un autre identifiant'
          res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error =>{
        const message = `le  Pokemon n'a pas pu etre récupéré. Réessayer dans quelques instants.`
        res.status(500).json({message , data:error})
      })
  })
}