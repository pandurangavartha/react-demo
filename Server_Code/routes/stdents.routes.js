const express = require('express')
const router = express.Router()
const student = require('../models/students.model')
const m = require('../helpers/middlewares')

/* All stdents */
router.get('/', async (req, res) => {
    await student.getstudents()
    .then(students => res.json(students))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A stdent by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await student.getstudent(id)
    .then(student => res.json(student))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new student */
router.student('/', m.checkFieldsstudent, async (req, res) => {
    await student.insertstudent(req.body)
    .then(student => res.status(201).json({
        message: `The student #${student.id} has been created`,
        content: student
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a stdent */
router.put('/:id', m.mustBeInteger, m.checkFieldsstudent, async (req, res) => {
    const id = req.params.id

    await student.updatestudent(id, req.body)
    .then(student => res.json({
        message: `The student #${id} has been updated`,
        content: student
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a student */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await student.deletestudent(id)
    .then(student => res.json({
        message: `The student #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router