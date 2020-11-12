const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    handleAuthentication: function(req, res){
        let viewSelected = "addProject"
        let enteredUserMail = req.body.emailUser
        let enteredUserPasswd = req.body.passwdUser

        

        res.render(viewSelected, {
            title:  'Back office',
            description: 'Bienvenue sur le Portfolio de Benjamin Catouillard - Back office'
        })
    }
}