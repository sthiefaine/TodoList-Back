const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const defaultTasks = [
{
    id: 1,
    label: 'Coder une todolist avec Next js',
    done: true,
  },
  {
    id: 13,
    label: 'Implementer Redux et Redux toolkit',
    done: true,
  },
  {
    id: 4,
    label: 'Marquer les Tâches comme effectuées',
    done: true,
  },
  {
    id: 8,
    label: 'LocalStorage',
    done: false,
  },
  {
    id: 9,
    label: 'Supprimer une Tâche',
    done: true,
  },
  {
    id: 55,
    label: 'Séparation Archivées, En Cours',
    done: false,
  },
  {
    id: 12,
    label: 'React Spring',
    done: false,
  },
  {
    id: 22,
    label: 'Recuperer les taches de depart via API (desactiver LocalSorage)',
    done: false,
  },
  {
    id: 23,
    label: 'Push une nouvelle Tâche en API',
    done: false,
  },
  {
    id: 24,
    label: 'Reactiver LocalSorage',
    done: false,
  },
  {
    id: 74,
    label: 'Ajouter des Catégories',
    done: false,
  },
];

const getTasks = (request, response) => {
  pool.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(defaultTasks)
  })
}

const addTask = (request, response) => {
  const {label} = request.body

  pool.query(
    'INSERT INTO task (label) VALUES ($1)',
    [label],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Task added.'})
    },
  )
}

app.route('/tasks')
  // GET endpoint
  .get(getTasks)

app.route('/task')
  // POST endpoint
  .post(addTask)
    // DEL endpoint

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})