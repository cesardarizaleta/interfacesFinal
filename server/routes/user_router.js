const express = require('express');
const { authenticateJwt } = require('../middlewares/auth_middleware');
const UsersService = require('../services/user_service');
const validatorHandler = require('../middlewares/validator_handler');
const { checkRole } = require('../middlewares/role_middleware');
const { updateUserSchema, createUserSchema, getUserSchema, updateProfileSchema } = require('../schemas/user_schema');
const ExcelJS = require('exceljs');

const { getFontSchema } = require('../schemas/font_schema');
const FontsService = require('../services/font_service');
const fontService = new FontsService();

const { getColorSchema } = require('../schemas/color_schema');
const ColorsService = require('../services/color_service');
const colorService = new ColorsService();

const router = express.Router();
const service = new UsersService();

// Temporary endpoint to check admin users (remove in production)
router.get('/check-admins',
  async (req, res, next) => {
    try {
      const users = await service.find();
      const adminUsers = users.filter(user => user.role === 'admin');
      res.json({
        totalUsers: users.length,
        adminUsers: adminUsers.map(user => ({
          id: user.id,
          email: user.email,
          role: user.role
        }))
      });
    } catch (error) {
      next(error);
    }
  }
);


router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Admin routes
router.get('/admin/stats',
  authenticateJwt,
  checkRole(['admin']),
  async (req, res, next) => {
    try {
      console.log('User accessing admin/stats:', req.user);
      const stats = await service.getUserStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/admin/export',
  authenticateJwt,
  checkRole(['admin']),
  async (req, res, next) => {
    try {
      const users = await service.find();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Usuarios');

      // Definir columnas
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'firstName', width: 15 },
        { header: 'Apellido', key: 'lastName', width: 15 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Rol', key: 'role', width: 10 },
        { header: 'Edad', key: 'age', width: 8 },
        { header: 'Género', key: 'gender', width: 10 },
        { header: 'Teléfono', key: 'phone', width: 15 },
        { header: 'Usuario', key: 'username', width: 15 },
        { header: 'Fecha Nacimiento', key: 'birthDate', width: 15 },
        { header: 'Grupo Sanguíneo', key: 'bloodGroup', width: 12 },
        { header: 'Altura', key: 'height', width: 10 },
        { header: 'Peso', key: 'weight', width: 10 },
        { header: 'Color Ojos', key: 'eyeColor', width: 12 },
        { header: 'Color Pelo', key: 'hairColor', width: 12 },
        { header: 'Tipo Pelo', key: 'hairType', width: 12 },
        { header: 'Dirección', key: 'address', width: 25 },
        { header: 'Ciudad', key: 'city', width: 15 },
        { header: 'Estado', key: 'state', width: 15 },
        { header: 'Código Estado', key: 'stateCode', width: 12 },
        { header: 'Código Postal', key: 'postalCode', width: 12 },
        { header: 'País', key: 'country', width: 15 },
        { header: 'Universidad', key: 'university', width: 20 },
        { header: 'Departamento', key: 'department', width: 15 },
        { header: 'Empresa', key: 'companyName', width: 20 },
        { header: 'Título', key: 'title', width: 15 },
        { header: 'Fecha Creación', key: 'createdAt', width: 18 },
        { header: 'Última Actualización', key: 'updatedAt', width: 18 }
      ];

      // Agregar filas de datos
      users.forEach(user => {
        worksheet.addRow({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          age: user.age,
          gender: user.gender,
          phone: user.phone,
          username: user.username,
          birthDate: user.birthDate,
          bloodGroup: user.bloodGroup,
          height: user.height,
          weight: user.weight,
          eyeColor: user.eyeColor,
          hairColor: user.hair?.color,
          hairType: user.hair?.type,
          address: user.address?.address,
          city: user.address?.city,
          state: user.address?.state,
          stateCode: user.address?.stateCode,
          postalCode: user.address?.postalCode,
          country: user.address?.country,
          university: user.university,
          department: user.company?.department,
          companyName: user.company?.name,
          title: user.company?.title,
          createdAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '',
          updatedAt: user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : ''
        });
      });

      // Estilizar el encabezado
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE6E6FA' }
      };

      // Configurar respuesta
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=usuarios.xlsx');

      await workbook.xlsx.write(res);
      res.end();

    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id/role',
  checkRole(['admin']),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!['admin', 'moderator', 'user'].includes(role)) {
        throw boom.badRequest('Invalid role');
      }

      const user = await service.updateRole(id, role);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

// Additional admin routes
router.get('/admin/all',
  authenticateJwt,
  checkRole(['admin']),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id/role',
  authenticateJwt,
  checkRole(['admin']),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Only admin and user roles are allowed.' });
      }

      const user = await service.updateRole(id, role);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
