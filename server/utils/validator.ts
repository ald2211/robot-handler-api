import * as Joi from "joi";

export const authValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Ensures it's a valid email
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/, "uppercase") // At least one uppercase letter
    .pattern(/[a-z]/, "lowercase") // At least one lowercase letter
    .pattern(/[0-9]/, "number") // At least one number
    .pattern(/[@$!%*?&]/, "special") // At least one special character
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.name":
        "Password must contain at least one {#name} character",
      "any.required": "Password is required",
    }),
});


export const createRobotSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  status: Joi.object({
    battery: Joi.number().min(0).max(100).required(),
    location: Joi.string().required(),
    mode: Joi.string().valid("idle", "active", "charging").required(),
    error: Joi.string().allow(null, "")
  }).required()
});

export const updateRobotStatusSchema = Joi.object({
  battery: Joi.number().min(0).max(100),
  location: Joi.string(),
  mode: Joi.string().valid("idle", "active", "charging"),
  error: Joi.string().allow(null, "")
});


export const createLogSchema = Joi.object({
  robotId: Joi.string().required(),
  message: Joi.string().required()
});