const Agendamento = require('../models/Agendamento')

const controller = {}   // Objeto vazio

controller.create = async (req, res) => {
  try {
    // Manda as informações que vieram em req.body
    // para serem gravadas no banco de dados
    await Agendamento.create(req.body)

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    // Retorna todos os documentos da coleção
    const result = await Agendamento.find()
    .populate('funcionario')
    .populate('cliente')
    .populate('servico')

    // HTTP 200: OK (implícito)
    res.send(result)
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async(req, res) => {
  try {
    const result = await Agendamento.findById(req.params.id)
    .populate('funcionario')
    .populate('cliente')
    .populate('servico')

    if(result) {
      // Encontrou o documento ~> HTTP 200: OK (implícito)
      res.send(result)
    }
    else {
      // Não encontrou o documento ~> HTTP 404: Not found
      res.status(404).end()
    }
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}
/*
controller.update = async (req, res) => {
  try {

    const result = await Agendamento.findByIdAndUpdate(req.params.id, req.body)

    if(result) {
      // Encontrou e atualizou ~> HTTP 204: No content
      res.status(204).end()
    }
    else {
      // Não encontrou para atualizar ~> HTTP 404: Not found
      res.status(404).end()
    }
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}*/

controller.update = async (req, res) => {
  try {
    const sale = await Agendamento.findById(req.params.id)

    if(req.body.items) {
      for(let item of req.body.items) {
        if(item._id) {

          if(item['$_delete'] === true) {
            sale.items.id(item._id).deleteOne()
          }
          else {
            for(let prop in item) {
              sale.items.id(item._id)[prop] = item[prop]
            }
          }
        }
        else {
          sale.items.push(item)   
        }
      }
      sale.markModified('items')
    }
    for(let prop in req.body) {
      if(prop !== 'items') {  
        console.log({prop})
        sale[prop] = req.body[prop]
        sale.markModified(prop)
      }
    }
    const result = await sale.save()

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
    const result = await Agendamento.findByIdAndDelete(req.params.id)

    if(result) {
      // Encontrou e excluiu ~> HTTP 204: No content
      res.status(204).end()
    }
    else {
      // Não encontrou para excluir ~> HTTP 404: Not found
      res.status(404).end()
    }
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

module.exports = controller
