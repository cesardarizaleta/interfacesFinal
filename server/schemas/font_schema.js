const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(2).max(50);
const fontFamily = Joi.string().min(1).max(50);
const fontType = Joi.string().valid('title', 'subtitle', 'paragraph', 'general').default('general');
const fontFilePath = Joi.string().max(512);
const fontWeight = Joi.string().valid('100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold', 'lighter', 'bolder').default('normal');
const fontStyle = Joi.string().valid('normal', 'italic', 'oblique').default('normal');
const fontFormat = Joi.string().valid('ttf', 'otf', 'woff', 'woff2').default('ttf');

const createFontSchema = Joi.object({
  name: name.required(),
  fontFamily: fontFamily.required(),
  fontType: fontType.optional(),
  fontFilePath: fontFilePath.optional(),
  fontWeight: fontWeight.optional(),
  fontStyle: fontStyle.optional(),
  fontFormat: fontFormat.optional(),
});

const updateFontSchema = Joi.object({
  name,
  fontFamily,
  fontType,
  fontFilePath,
  fontWeight,
  fontStyle,
  fontFormat,
});

const getFontSchema = Joi.object({
  id: id.required()
});

const assignFontSchema = Joi.object({
  fontId: id.required(),
  fontType: fontType.required(),
});

module.exports = { createFontSchema, updateFontSchema, getFontSchema, assignFontSchema }
