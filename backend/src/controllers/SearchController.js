const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsarray');

module.exports = {
  async index(request, response){
    //buscar todos os devs num raio de 10 km
    //Filtrar por tecnologia

    const [latitude, longitude, techs] = request .query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        //encontrar objetos pertos de uma localização
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000, //10km
        },
      },
    });

    return response.json({ devs });
  }
}