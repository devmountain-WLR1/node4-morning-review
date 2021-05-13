module.exports = {
    checkEmail: (req, res, next) => {
        if (req.body.email.includes('@') && req.body.email.includes('.')){
            next();
        } else {
            res.status(403).send("Invalid Email Address");
        }
    }
}