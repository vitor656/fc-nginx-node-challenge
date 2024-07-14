const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Fulano')`
connection.query(sql)

let resultContent;
const selectStatement = `SELECT name FROM people`
connection.query(selectStatement, function (err, result, fields) {
    if (err)
        throw err;

    let listContent = '';
    result.forEach(element => {
        listContent += `<li>${element.name}</li>`
    });

    resultContent = `<h2>Dados persistidos:</h2><ul>${listContent}</ul>`
})
connection.end()


app.get('/', (req, res) => {
    res.send(`<h1>Full cycle</h1> ${resultContent}`)
})

app.listen(port, (req, res) => {
    console.log('Rodando na porta ', port)
})