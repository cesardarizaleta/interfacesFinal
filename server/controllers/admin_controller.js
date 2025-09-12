const { UsersService } = require('../services/user_service');
const { ColorsService } = require('../services/color_service');
const { FontsService } = require('../services/font_service');

class AdminController {
  constructor() {
    this.usersService = new UsersService();
    this.colorsService = new ColorsService();
    this.fontsService = new FontsService();
  }

  async getDashboard(req, res, next) {
    try {
      const stats = await this.usersService.getUserStats();
      const recentUsers = await this.usersService.find(); // En un sistema real, limitar a los más recientes

      res.json({
        stats,
        recentUsers: recentUsers.slice(0, 10) // Últimos 10 usuarios
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.usersService.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getAllColors(req, res, next) {
    try {
      const colors = await this.colorsService.find();
      res.json(colors);
    } catch (error) {
      next(error);
    }
  }

  async getAllFonts(req, res, next) {
    try {
      const fonts = await this.fontsService.find();
      res.json(fonts);
    } catch (error) {
      next(error);
    }
  }

  async exportUsers(req, res, next) {
    try {
      const { format = 'xlsx' } = req.query;
      const users = await this.usersService.find();

      if (format === 'pdf') {
        const PDFDocument = require('pdfkit');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=usuarios_landing_photography.pdf');

        const doc = new PDFDocument({ margin: 40, size: 'A4' });
        doc.pipe(res);

        // Título
        doc.fontSize(20).fillColor('#2D3748').text('LANDING PHOTOGRAPHY', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(12).fillColor('#4A5568').text('Reporte de Usuarios del Sistema', { align: 'center' });
        doc.moveDown(0.2);
        doc.fontSize(9).fillColor('#718096').text(`Generado el: ${new Date().toLocaleString('es-ES')}`, { align: 'center' });
        doc.moveDown(1);
        doc.fontSize(10).fillColor('#2B6CB0').text(`Total de usuarios: ${users.length}`, { align: 'center' });
        doc.moveDown(1);

        // Encabezados de tabla
        const headers = ['ID', 'Nombre', 'Apellido', 'Email', 'Rol'];
        const columnWidths = [40, 90, 90, 180, 60];
        let startX = doc.page.margins.left;
        let y = doc.y;

        doc.fontSize(10).fillColor('#FFFFFF');
        headers.forEach((h, i) => {
          doc.rect(startX, y, columnWidths[i], 20).fill('#2D3748').stroke();
          doc.fillColor('#FFFFFF').text(h, startX + 5, y + 5, { width: columnWidths[i] - 10, align: 'left' });
          startX += columnWidths[i];
        });
        y += 20;

        // Filas de datos
        users.forEach((u, rowIndex) => {
          startX = doc.page.margins.left;
            const rowHeight = 18;
            const fillColor = rowIndex % 2 === 0 ? '#F7FAFC' : '#EDF2F7';
            // Fondo fila
            doc.fillColor(fillColor).rect(startX, y, columnWidths.reduce((a,b)=>a+b,0), rowHeight).fill();

            // Texto
            const cells = [u.id, u.firstName || '', u.lastName || '', u.email, u.role];
            cells.forEach((c, i) => {
              doc.fillColor('#2D3748').fontSize(9).text(String(c), startX + 5, y + 4, { width: columnWidths[i] - 10, align: 'left' });
              // Bordes
              doc.rect(startX, y, columnWidths[i], rowHeight).stroke('#E2E8F0');
              startX += columnWidths[i];
            });
            y += rowHeight;

            // Nueva página si excede
            if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
              doc.addPage();
              y = doc.y;
            }
        });

        // Pie
        doc.moveDown(2);
        doc.fontSize(9).fillColor('#718096').text('© 2025 LANDING PHOTOGRAPHY - Sistema Administrativo', { align: 'center' });

        doc.end();
        return;
      }

      // Excel (default) con logo arriba de la tabla
      const ExcelJS = require('exceljs');
      const path = require('path');
      const fs = require('fs');
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Usuarios');

      workbook.creator = 'LANDING PHOTOGRAPHY';
      workbook.lastModifiedBy = 'Sistema Administrativo';
      workbook.created = new Date();
      workbook.modified = new Date();

      // Intentar cargar logo desde carpeta client/assets/Logo.png
      const logoPath = path.join(__dirname, '..', '..', 'client', 'assets', 'Logo.png');
      if (fs.existsSync(logoPath)) {
        const imageId = workbook.addImage({ filename: logoPath, extension: 'png' });
        // Colocar logo ocupando A1:D5 (espacio reservado)
        worksheet.addImage(imageId, {
          tl: { col: 0, row: 0 }, // top-left
          br: { col: 4, row: 5 }  // bottom-right (no inclusivo exacto, ajusta tamaño)
        });
      }

      // A partir de la fila 6 colocamos títulos y metadatos
      const baseRow = 6;
      worksheet.mergeCells(`A${baseRow}:D${baseRow}`);
      const titleCell = worksheet.getCell(`A${baseRow}`);
      titleCell.value = 'LANDING PHOTOGRAPHY';
      titleCell.font = { name: 'Arial', size: 18, bold: true, color: { argb: 'FF2D3748' } };
      titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7FAFC' } };
      worksheet.getRow(baseRow).height = 30;

      worksheet.mergeCells(`A${baseRow + 1}:D${baseRow + 1}`);
      const subtitleCell = worksheet.getCell(`A${baseRow + 1}`);
      subtitleCell.value = 'Reporte de Usuarios del Sistema';
      subtitleCell.font = { name: 'Arial', size: 12, italic: true, color: { argb: 'FF4A5568' } };
      subtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.getRow(baseRow + 1).height = 25;

      worksheet.mergeCells(`A${baseRow + 2}:D${baseRow + 2}`);
      const dateCell = worksheet.getCell(`A${baseRow + 2}`);
      dateCell.value = `Generado el: ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
      dateCell.font = { name: 'Arial', size: 10, color: { argb: 'FF718096' } };
      dateCell.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.getRow(baseRow + 2).height = 20;

      worksheet.mergeCells(`A${baseRow + 3}:D${baseRow + 3}`);
      const statsCell = worksheet.getCell(`A${baseRow + 3}`);
      statsCell.value = `Total de usuarios: ${users.length}`;
      statsCell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FF2B6CB0' } };
      statsCell.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.getRow(baseRow + 3).height = 22;

      worksheet.getRow(baseRow + 4).height = 15; // fila en blanco

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 8 },
        { header: 'Nombre', key: 'firstName', width: 15 },
        { header: 'Apellido', key: 'lastName', width: 15 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Rol', key: 'role', width: 12 },
        { header: 'Edad', key: 'age', width: 8 },
        { header: 'Registro', key: 'createdAt', width: 18 }
      ];

      const headerRowIndex = baseRow + 5; // antes era 6, ahora desplazado
      const headerRow = worksheet.getRow(headerRowIndex);
      headerRow.height = 25;
      headerRow.eachCell((cell) => {
        cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2D3748' } };
        cell.border = { top: { style: 'thin', color: { argb: 'FF4A5568' } }, left: { style: 'thin', color: { argb: 'FF4A5568' } }, bottom: { style: 'thin', color: { argb: 'FF4A5568' } }, right: { style: 'thin', color: { argb: 'FF4A5568' } } };
      });

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
        row.eachCell((cell, colNumber) => {
          cell.font = { name: 'Arial', size: 10, color: { argb: 'FF2D3748' } };
          cell.alignment = { horizontal: 'left', vertical: 'middle' };
          cell.border = { top: { style: 'thin', color: { argb: 'FFE2E8F0' } }, left: { style: 'thin', color: { argb: 'FFE2E8F0' } }, bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } }, right: { style: 'thin', color: { argb: 'FFE2E8F0' } } };
          if (colNumber === 5) {
            if (user.role === 'admin') {
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF5E7' } };
              cell.font.color = { argb: 'FFD69E2E' };
            } else if (user.role === 'user') {
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FFF4' } };
              cell.font.color = { argb: 'FF38A169' };
            }
          }
          if (index % 2 === 1) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7FAFC' } };
          }
        });
        row.height = 20;
      });

      const lastRow = worksheet.lastRow.number + 2;
      worksheet.mergeCells(`A${lastRow}:D${lastRow}`);
      const footerCell = worksheet.getCell(`A${lastRow}`);
      footerCell.value = '© 2025 LANDING PHOTOGRAPHY - Sistema Administrativo';
      footerCell.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF718096' } };
      footerCell.alignment = { horizontal: 'center', vertical: 'middle' };

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=usuarios_landing_photography.xlsx');
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { AdminController };
