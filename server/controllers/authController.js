const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');

        let [user] = await db.check_user(email);
        if (user){
            return res.status(400).send('Email already exists')
        }

        let salt = bcrypt.genSaltSyn(10);
        let hash = bcrypt.hashSync(password, salt);
        let [newUser] = await db.register_user(email, hash);

        req.session.user = newUser;
        delete req.session.user.password;
        res.status(201).send(req.session.user);
    }
}