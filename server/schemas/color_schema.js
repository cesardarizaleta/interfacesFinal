const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(4).max(20);
const colorPrimary = Joi.string().length(7).pattern(/^#([A-Fa-f0-9]{6})$/) // Valida el formato del hexcode
const colorSecondary = Joi.string().length(7).pattern(/^#([A-Fa-f0-9]{6})$/) // Valida el formato del hexcode
const colorAccent = Joi.string().length(7).pattern(/^#([A-Fa-f0-9]{6})$/) // Valida el formato del hexcode
const colorText = Joi.string().length(7).pattern(/^#([A-Fa-f0-9]{6})$/) // Valida el formato del hexcode
const backgroundNeutral = Joi.string().length(7).pattern(/^#([A-Fa-f0-9]{6})$/) // Valida el formato del hexcode
const isDefault = Joi.boolean().default(false);
const isActive = Joi.boolean().default(false);

const createColorSchema = Joi.object({
  name: name.required(),
  colorPrimary: colorPrimary.required(),
  colorSecondary: colorSecondary.required(),
  colorAccent: colorAccent.required(),
  colorText: colorText.required(),
  backgroundNeutral: backgroundNeutral.required(),
  isDefault: isDefault,
  isActive: isActive
});

const updateColorSchema = Joi.object({
  name,
  colorPrimary,
  colorSecondary,
  colorAccent,
  colorText,
  backgroundNeutral,
  isActive
});

const getColorSchema = Joi.object({
  id: id.required()
});

module.exports = { createColorSchema, updateColorSchema, getColorSchema }
