const db = require('../config/db');

const getAllSneakers = (req,res) => {
    db.query ('SELECT * from produtos', (err, results) => {
        if(err){
            console.error('Error em obter produtos', err);
            res.status(500).send('Error em obter transações');
            return;
        }
        res.json(results);
    })}

const addSneakers = (req,res) => {
    const {modelo, marca, preco} = req.body;
    db.query ('INSERT INTO produtos (modelo, marca, preco) VALUES(?,?,?)', [modelo, marca, preco],(err, results)=> {
        if(err){
            console.error('Error em adicionar produto(s)', err);
            res.status(500).send('Error em adicionar produto(s)');
            return;
        }
        res.status(201).send('transação adicionada com sucesso');
})}
    
const updateSneakersPut = (req,res) => {
    const {id} = req.params;
    const {modelo, marca, preco} = req.body
    db.query ('UPDATE produtos set modelo=?, nome=?, preco=? WHERE id=?', [modelo, marca, preco, id],
        (err, results) => {
        if(err) {
            console.error('Error em obter produto(s)', err);
            res.status(500).send('Error em adicionar produto(s)');
            return;
        }
            res.status(201).send('Produto(s) adicionada com sucesso');
        }
    );
};

const updateSneakersPatch = (req, res) => {
const {id} = req.params;
const fields = req.body;
const query = [];
const values = [];
    
for (const [key,value] of Object.entries(fields)) {
    query.push(`${key}=?`);
    values.push(value);
}
values.push(id);
    
db.query (
     `UPDATE produtos SET ${query.join(',')} WHERE id = ?`,
    values,
    (err, results) => {
        if(err){
            console.error('Erro ao atualizar transação', err);
            res.status(500).send('Erro ao adicionar transação');
        return;
        }
    res.send('Transação atualizada com sucesso');
})}

const deleteSneakers = (req,res) => {
const {id} = req.params;
db.query(
    'DELETE FROM produtos WHERE id = ?',[id],
    (err, results) => {
        if(err){
            console.error('Erro ao deletar produto', err);
            res.status(500).send('Erro ao deletar produto');
            return;
        }
    res.send('Produto deletado com sucesso');
})}

module.exports = {
    getAllSneakers,
    addSneakers,
    updateSneakersPut,
    updateSneakersPatch,
    deleteSneakers
};