const express = require('express')
const router = express.Router()
const Message = require('../http/model/message')

router.get('/', (req, res) => {
    const path = '/Users/deandenaki/Developer/learn_express/CRUD_express/views/index.html'
    res.sendFile(path);
})

router.get('/api', async (req, res) => {
    try {
        const data = await Message.findAll()
        res.send(data)
    } catch (err) {
        console.error('cannot get api: ' + err)
    }
})

router.post('/post', async (req, res) => {
    try {
        const { message } = req.body;
        await Message.create({ message });
        res.status(201).redirect('/')
    } catch (error) {
        console.error('Create error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Message.destroy({ where: { id: parseInt(id, 10) } })

        if (deleted) {
            return res.json({ message: `Message with ID ${id} deleted.` });
        }
    } catch(err) {
        console.error('cannot delete: ', err)
    }
})

module.exports = router;