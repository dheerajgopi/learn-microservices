'use strict'

module.exports = (app, options) => {

    app.get('/users', (req, res, next) => {

        options.repository.getUsers().then((users) => {
            res.status(200).send(users);
        })
        .catch(next);

    });

    app.get('/search', (req, res, next) => {

        const email = req.query.email;

        if (!email) {
            throw new Error('When searching for a user, the email must be specified, e.g: "/search?email=homer@thesimpsons.com".');
        }

        options.repository.getUserByEmail(email).then((user) => {
            if (!user) {
                res.status(404).send('User not found.');
            } else {
                res.status(200).send(user);
            }
        })
        .catch(next);

    });
}