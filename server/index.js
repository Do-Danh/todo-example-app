const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const openDb = () => {
    const pool = new Pool ({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'test',
        port: 5432
    })
    return pool
}

const app = express()
app.use(cors())
const port = 3001

app.get("/",(req,res) => {
    const pool = openDb()

    pool.query('SELECT * FROM task', (error,result) => {
        if (error) {
            res.status(500).json({error: error.message})
        }
        res.status(200).json(result.rows)
    })
})

app.listen(port)