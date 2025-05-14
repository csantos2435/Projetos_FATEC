const router = require('express').Router();
const Funcionario = require('../models/funcionario');

router.post('/', (req, res) => {
    const {nome, telefone, salario, endereco} = req.body; 
    if (!nome && !telefone && !salario && !endereco){
        res.status(422).json({ error: 'Informar o nome, cargo, salario e desligado é obrigatório!'});
    }
    const funcionario = {
        nome, 
        telefone, 
        salario, 
        endereco
    };
    try {
        Funcionario.create(funcionario);
        res.status(201).json({message: 'Funcionário cadastrado com sucesso!'})
    } catch (error) {
        res.status(508).json({error: error});
    }
});

router.get('/', async (req, res) => {
    try { 
        const funcionarios = await Funcionario.find(); 
        res.json(funcionarios);    
    } catch (erro) { 
        console.error('Erro ao obter funcionarios', error); 
        res.status(500).json({ message: 'Erro ao obter funcionários' });    
} });    

router.put('/:id', async (req, res) => { 
    const { id } = req.params;    
    const { nome, telefone, salario, endereco } = req.body;    

    try { 
        const funcionario = await Funcionario.findByIdAndUpdate( 
            id,
            { nome, telefone, salario, endereco }, 
            { new: true} 
        );
        if (!funcionario) { 
            return res.status(404).json({ message: 'Funcionário não encontrado' }); 
        } 

        res.json(funcionario);    
    } catch (error) { 
        console.error('Erro ao atualizar funcionario', error); 
        res.status(508).json({ message: 'Erro ao atualizar funcionário' });    
    }    
});    

router.delete('/:id', async (req, res) => { 
    const {id} = req.params;    
    
    try { 
        const funcionario = await Funcionario.findByIdAndDelete(id);    
        if (!funcionario) { 
            return res.status(404).json({ message: 'Funcionário não encontrado ' });    
        }
        res.json({ message: 'Funcionário deletado com sucesso' }); 
    } catch (error) { 
        console.error('Erro ao deletar funcionário', error); 
        res.status(500).json({ message: 'Erro ao deletar funcionário' });
    }
});


module.exports = router;