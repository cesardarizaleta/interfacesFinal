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

      // Configurar propiedades del workbook
      workbook.creator = 'LANDING PHOTOGRAPHY';
      workbook.lastModifiedBy = 'Sistema Administrativo';
      workbook.created = new Date();
      workbook.modified = new Date();

      // Título principal
      worksheet.mergeCells('A1:D1');
      const titleCell = worksheet.getCell('A1');
      titleCell.value = 'LANDING PHOTOGRAPHY';
      titleCell.font = {
        name: 'Arial',
        size: 18,
        bold: true,
        color: { argb: 'FF2D3748' }
      };
      titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      titleCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF7FAFC' }
      };
      worksheet.getRow(1).height = 30;

      // Subtítulo
      worksheet.mergeCells('A2:D2');
      const subtitleCell = worksheet.getCell('A2');
      subtitleCell.value = 'Reporte de Usuarios del Sistema';
      subtitleCell.font = {
        name: 'Arial',
        size: 12,
        italic: true,
        color: { argb: 'FF4A5568' }
      };
      subtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.getRow(2).height = 25;

      // Fecha de generación
      worksheet.mergeCells('A3:D3');
      const dateCell = worksheet.getCell('A3');
      dateCell.value = `Generado el: ${new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`;
      dateCell.font = {
        name: 'Arial',
        size: 10,
        color: { argb: 'FF718096' }
      };
      dateCell.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.getRow(3).height = 20;

      // Estadísticas
      worksheet.mergeCells('A4:D4');
      const statsCell = worksheet.getCell('A4');
      statsCell.value = `Total de usuarios: ${users.length}`;
      statsCell.font = {
        name: 'Arial',
        size: 11,
        bold: true,
        color: { argb: 'FF2B6CB0' }
      };
      statsCell.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.getRow(4).height = 22;

      // Espacio en blanco
      worksheet.getRow(5).height = 15;

      // Definir columnas con mejor formato
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 8 },
        { header: 'Nombre', key: 'firstName', width: 15 },
        { header: 'Apellido', key: 'lastName', width: 15 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Rol', key: 'role', width: 12 },
        { header: 'Edad', key: 'age', width: 8 },
        { header: 'Registro', key: 'createdAt', width: 18 }
      ];

      // Estilo para los headers
      const headerRow = worksheet.getRow(6);
      headerRow.height = 25;
      headerRow.eachCell((cell) => {
        cell.font = {
          name: 'Arial',
          size: 11,
          bold: true,
          color: { argb: 'FFFFFFFF' }
        };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF2D3748' }
        };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF4A5568' } },
          left: { style: 'thin', color: { argb: 'FF4A5568' } },
          bottom: { style: 'thin', color: { argb: 'FF4A5568' } },
          right: { style: 'thin', color: { argb: 'FF4A5568' } }
        };
      });

      // Agregar datos con formato
      users.forEach((user, index) => {
        const row = worksheet.addRow({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          age: user.age || 'N/A',
          createdAt: new Date(user.createdAt).toLocaleDateString('es-ES')
        });

        // Estilo para las filas de datos
        row.eachCell((cell, colNumber) => {
          cell.font = {
            name: 'Arial',
            size: 10,
            color: { argb: 'FF2D3748' }
          };
          cell.alignment = { horizontal: 'left', vertical: 'middle' };
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
          };

          // Formato especial para el rol
          if (colNumber === 5) { // Columna del rol
            if (user.role === 'admin') {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFEF5E7' }
              };
              cell.font.color = { argb: 'FFD69E2E' };
            } else if (user.role === 'user') {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF0FFF4' }
              };
              cell.font.color = { argb: 'FF38A169' };
            }
          }

          // Formato para filas alternas
          if (index % 2 === 1) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFF7FAFC' }
            };
          }
        });

        row.height = 20;
      });

      // Pie de página
      const lastRow = worksheet.lastRow.number + 2;
      worksheet.mergeCells(`A${lastRow}:D${lastRow}`);
      const footerCell = worksheet.getCell(`A${lastRow}`);
      footerCell.value = '© 2025 LANDING PHOTOGRAPHY - Sistema Administrativo';
      footerCell.font = {
        name: 'Arial',
        size: 9,
        italic: true,
        color: { argb: 'FF718096' }
      };
      footerCell.alignment = { horizontal: 'center', vertical: 'middle' };

      // Configurar headers para descarga
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=usuarios_landing_photography.xlsx');

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
