const container = require('../container');

class UsersController {
  constructor() {
    this.service = container.getService('users');
  }

  async getUsers(req, res, next) {
    try {
      const users = await this.service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserStats(req, res, next) {
    try {
      const stats = await this.service.getUserStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const userData = req.body;
      const newUser = await this.service.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.service.update(id, userData);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const updatedUser = await this.service.updateRole(id, role);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async getUsersByRole(req, res, next) {
    try {
      const { role } = req.params;
      const users = await this.service.findByRole(role);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async exportUsers(req, res, next) {
    try {
      const users = await this.service.find();
      const ExcelJS = require('exceljs');

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
      ];

      // Agregar datos
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
        });
      });

      // Configurar headers para descarga
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=usuarios.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      next(error);
    }
  }

  async checkAdmins(req, res, next) {
    try {
      const users = await this.service.find();
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
}

module.exports = { UsersController };
