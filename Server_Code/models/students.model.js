let students = require('../data/students.json')
const filename = './data/students.json'
const helper = require('../helpers/helper.js')

function getstudents() {
    return new Promise((resolve, reject) => {
        if (students.length === 0) {
            reject({
                message: 'no students available',
                status: 202
            })
        }

        resolve(students)
    })
}

function getstudent(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(students, id)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}

function insertstudent(newPost) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(students) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newPost = { ...id, ...date, ...newPost }
        students.push(newPost)
        helper.writeJSONFile(filename, students)
        resolve(newPost)
    })
}

function updatestudent(id, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(students, id)
        .then(post => {
            const index = students.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            } 
            students[index] = { ...id, ...date, ...newPost }
            helper.writeJSONFile(filename, students)
            resolve(students[index])
        })
        .catch(err => reject(err))
    })
}

function deletestudent(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(students, id)
        .then(() => {
            students = students.filter(p => p.id !== id)
            helper.writeJSONFile(filename, students)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertstudent,
    getstudents,
    getstudent, 
    updatestudent,
    deletestudent
}