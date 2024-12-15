const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Configuração do banco de dados
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'app_db',
};

// Rota principal
app.get('/', async (req, res) => {
    try {
        // Conexão com o banco de dados
        const connection = await mysql.createConnection(dbConfig);

        // Criação da tabela (se não existir)
        await connection.query(`
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);

        // Inserção de um registro
        const name = `User ${Math.floor(Math.random() * 1000)}`;
        await connection.query('INSERT INTO people (name) VALUES (?)', [name]);

        // Consulta de registros
        const [rows] = await connection.query('SELECT name FROM people');

        // Resposta com os registros
        const namesList = rows.map(row => `<li>${row.name}</li>`).join('');
        res.send(`<h1>Full Cycle Rocks!</h1>`);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
