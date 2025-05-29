const express = require('express')
const router = express.Router();

let user = [];
let idCounter = 1;

router.get('/', (req, res) => {
    res.json(user);
});

router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are Required'})
    }

    const newUser ={ id : idCounter++, name, email};
    user.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;