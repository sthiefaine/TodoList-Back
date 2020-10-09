const {
    pool
} = require('./config')

const getTasks = (request, response) => {
    pool.query('SELECT * FROM tasks', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createTask = (request, response) => {
    const {
        label
    } = request.body.data

    pool.query(
        'INSERT INTO tasks (label) VALUES ($1) RETURNING *',
        [label],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).json(...results.rows)
        },
    )
}

const deleteTask = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        'DELETE FROM tasks WHERE id = ($1) RETURNING *',
        [id],
        (error, results) => {
            if (error) {
                throw error
            }
            console.table(results.rows)
            response.status(201).json(...results.rows)
        },
    )
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
}