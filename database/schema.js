const Schema = {
    users: {
        idUser: {type: 'increments', nullable: false, primary: true},
        emailUser: {type: 'string', maxlength: 254, nullable: false, unique: true},
        passwdUser: {type: 'string', maxlength:254, nullable: false}
    },

    tech: {
        idTech: {type: 'increments', nullable: false, primary: true},
        titleTech: {type: 'string', maxlength: 254, nullable: false},
        classTech: {type: 'string', maxlength: 254, nullable: false}
    },

    projects: {
        idProject: {type: 'increments', nullable: false, primary: true},
        titleProject: {type: 'string', maxlength: 254, nullable: false},
        shortDescriptionProject: {type: 'string', maxlength: 254, nullable: false},
        descriptionProject: {type: 'string', maxlength: 254, nullable: false},
        imgProject: {type: 'string', maxlength: 254, nullable: false}
    },

    using: {
        idUsing: {type: 'increments', nullable: false, primary: true},
        idProject: {type: 'increments', nullable: false, unsigned: true},
        idTech: {type: 'increments', nullable: false, unsigned: true}
    }
}

module.exports = Schema