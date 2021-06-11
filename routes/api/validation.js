const Joi = require("joi");

const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tids: { allow: ["com", "net"] } })
    .required(),
    phone: Joi.string().require(),
    isOnline: Joi.boolean(),
})
.with("name", "email")
.with("name", "phone");


const schemaUpdateContact = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
    .email({
        minDomainSegments: 2,
        tids: { allow: ["com", "net"] },
    })
    .optional(),
    phone: Joi.string().optional(),
    isOnline: Joi.boolean().optional(),
}).or("name", "phone", "email", "isOnline");


const schemaUpdateStatusContact = Joi.object({
    isOnline: Joi.boolean().required(),
});

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        next();
    } catch (err) {
        next({
            status: 400,
            message: err.message.replace(/"/g, ""),
        });
        }
};

module.exports = {
    validationCreateContact: (req, res, next) => {
        return validate(schemaCreateContact, req.body, next);
    },
    validationUpdateContact: (req, res, next) => {
        return validate(schemaUpdateContact, req.body, next);
    },
    validationUpdateStatusContact: (req, res, next) => {
        return validate(schemaUpdateStatusContact, req.body, next);
    },
};
