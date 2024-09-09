const db = require('../config/db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => { 
 const { name, email, password, birth_date } = req.body;

 try { 
 const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', 
[email]); 
 if (existingUser.length > 0) { 
 return res.status(400).send('Usuário já registrado'); 
 } 

 const hashedPassword = await bcrypt.hash(password, 10); 

 await db.promise().query( 
 'INSERT INTO users (name, email, password, birth_date) VALUES (?, ?, ?, ?)', 
 [name, email, hashedPassword, birth_date] 
 ); 
 res.status(201).send('Usuário registrado com sucesso'); 
 } catch (err) { 
 console.error('Erro ao registrar usuário:', err); 
 res.status(500).send('Erro ao registrar usuário'); 
 } 
}; 

const loginUser = async (req, res) => { 
 const { email, password } = req.body;

 try { 
 const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]); 
 if (user.length === 0) { 
 return res.status(400).send('Credenciais inválidas'); 
 } 

 const isMatch = await bcrypt.compare(password, user[0].password); 
 if (!isMatch) { 
 return res.status(400).send('Credenciais inválidas'); 
 } 

 const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
 res.json({ token }); 
 } catch (err) { 
 console.error('Erro ao autenticar usuário:', err); 
 res.status(500).send('Erro ao autenticar usuário'); 
 } 
}; 
module.exports = { 
 registerUser, 
 loginUser 
};