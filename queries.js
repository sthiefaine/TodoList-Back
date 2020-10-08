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
    } = request.body

    pool.query(
        'INSERT INTO task (label) VALUES ($1)',
        [label],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).json({
                status: 'success',
                message: 'Task added.',
                rr: `${results.insertId}`,
            })
        },
    )
}

const deleteTask = (request, response) => {
    const {
        id
    } = parseInt(request.body)

    pool.query(
        'DELETE FROM task WHERE id = ($1)',
        [id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).json({
                status: 'success',
                message: 'Task deleted',
                rr: `${results}`,
            })
        },
    )
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
}