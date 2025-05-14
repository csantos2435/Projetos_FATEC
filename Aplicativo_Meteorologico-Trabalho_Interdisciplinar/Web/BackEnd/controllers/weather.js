const Weather = require('../models/Weather')

const controller = {}   

controller.create = async (req, res) => {
  try {
    await Weather.create(req.body)

    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    const result = await Weather.find()
    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async(req, res) => {
  try {
    const result = await Weather.findById(req.params.id)

    if(result) {
      res.send(result)
    }
    else {
      res.status(404).end()
    }
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOneCity = async(req, res) => {
  const cityNameParametro = req.params.nameCity;
  const cityDateParametro = req.params.data;

  try {
    const result = await Weather.findOne({name_city: cityNameParametro, data: cityDateParametro}).exec();
    
    if(result) {
      res.send(result)
    }
    else {
      res.status(404).end()
    }
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async (req, res) => {
  try {
    const result = await Weather.findByIdAndUpdate(req.params.id, req.body)
    if(result) {
      res.status(204).end()
    }
    else {
      res.status(404).end()
    }
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.delete = async (req, res) => {
  try {
    const result = await Weather.findByIdAndDelete(req.params.id)
    if(result) {
      res.status(204).end()
    }
    else {
      res.status(404).end()
    }
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

module.exports = controller
