const { User, UserSchema } = require('./user_model');
const { Color, ColorSchema } = require('./color_model');
const { Font, FontSchema } = require('./font_model');
const { Gallery, GallerySchema } = require('./gallery_model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Color.init(ColorSchema, Color.config(sequelize));
  Font.init(FontSchema, Font.config(sequelize));
  Gallery.init(GallerySchema, Gallery.config(sequelize));

  User.associate(sequelize.models);
  Color.associate(sequelize.models);
  Font.associate(sequelize.models);
  Gallery.associate(sequelize.models);
}

module.exports = { setupModels, models: { User, Color, Font, Gallery } };
