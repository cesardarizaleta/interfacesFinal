const Joi = require('joi');

const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const firstName = Joi.string().min(1).max(50);
const lastName = Joi.string().min(1).max(50);
const maidenName = Joi.string().min(1).max(50);
const age = Joi.number().integer().min(1).max(150);
const gender = Joi.string().valid('male', 'female', 'other');
const phone = Joi.string().min(1).max(20);
const username = Joi.string().min(3).max(30);
const birthDate = Joi.string();
const image = Joi.string().uri();
const bloodGroup = Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
const height = Joi.number().min(0);
const weight = Joi.number().min(0);
const eyeColor = Joi.string();
const hairColor = Joi.string();
const hairType = Joi.string();
const ip = Joi.string();
const address = Joi.string();
const city = Joi.string();
const state = Joi.string();
const stateCode = Joi.string();
const postalCode = Joi.string();
const country = Joi.string();
const lat = Joi.number();
const lng = Joi.number();
const macAddress = Joi.string();
const university = Joi.string();
const cardExpire = Joi.string();
const cardNumber = Joi.string();
const cardType = Joi.string();
const currency = Joi.string();
const iban = Joi.string();
const department = Joi.string();
const companyName = Joi.string();
const title = Joi.string();
const companyAddress = Joi.string();
const companyCity = Joi.string();
const companyState = Joi.string();
const companyStateCode = Joi.string();
const companyPostalCode = Joi.string();
const companyLat = Joi.number();
const companyLng = Joi.number();
const companyCountry = Joi.string();
const ein = Joi.string();
const ssn = Joi.string();
const userAgent = Joi.string();
const coin = Joi.string();
const wallet = Joi.string();
const network = Joi.string();
const role = Joi.string().valid('admin', 'moderator', 'user').default('user');

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.optional()
});

const updateUserSchema = Joi.object({
  email,
  password,
  firstName,
  lastName,
  maidenName,
  age,
  gender,
  phone,
  username,
  birthDate,
  image,
  bloodGroup,
  height,
  weight,
  eyeColor,
  hairColor,
  hairType,
  ip,
  address,
  city,
  state,
  stateCode,
  postalCode,
  country,
  lat,
  lng,
  macAddress,
  university,
  cardExpire,
  cardNumber,
  cardType,
  currency,
  iban,
  department,
  companyName,
  title,
  companyAddress,
  companyCity,
  companyState,
  companyStateCode,
  companyPostalCode,
  companyLat,
  companyLng,
  companyCountry,
  ein,
  ssn,
  userAgent,
  coin,
  wallet,
  network,
  role
});

const getUserSchema = Joi.object({
  id: id.required()
});

const updateProfileSchema = Joi.object({
  firstName,
  lastName,
  maidenName,
  age,
  gender,
  phone,
  username,
  birthDate,
  image,
  bloodGroup,
  height,
  weight,
  eyeColor,
  hairColor,
  hairType,
  address,
  city,
  state,
  stateCode,
  postalCode,
  country,
  lat,
  lng,
  macAddress,
  university,
  cardExpire,
  cardNumber,
  cardType,
  currency,
  iban,
  department,
  companyName,
  title,
  companyAddress,
  companyCity,
  companyState,
  companyStateCode,
  companyPostalCode,
  companyLat,
  companyLng,
  companyCountry,
  ein,
  ssn,
  userAgent,
  coin,
  wallet,
  network
});

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, updateProfileSchema, loginUserSchema }
