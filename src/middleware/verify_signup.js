const db = require('../../database/models');
const roles = db.Role;
const User = db.User;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: 'Failed! Email already exist!'
            });
            return;
        }
        next();
    })
}

checkRolesExisted = (req, res, nex) => {
    let roleReq = req.body.roles;
    if(roleReq) {
        for (let i = 0;i < roleReq.length; i++) {
            if(!roles.include(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Roles '${req.body.roles[i]}' is not available`
                })
                return;
            }
        }
    }
    next();
};

const verifySignup = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignup;