const Joi = require ('joi')

const registerValidation = data => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        birthdate: Joi.date().required(),
        email: Joi.string().required().email(),
        password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Z].*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*{}[\]()\-__+.]).{8,}$/)
        .messages({
            "string.min": "Password must have at least 8 characters",
            "string.pattern.base": "Password should contain at least one lower case letter, one uppercase letter, a number and a special character"
          })
    }).options({ allowUnknown: true })

    return schema.validate(data)
}

module.exports = {
    registerValidation
}