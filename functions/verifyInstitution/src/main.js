/* eslint-disable import/no-anonymous-default-export */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export default async ({ req, res, log, error }) => {
  try {
    // Appwrite trimite datele aici
    const payload = JSON.parse(req.payload || '{}');
    const emailDeVerificat = 'primariatm@primariatm.ro';

    if (!emailDeVerificat) {
      log('Lipsește emailul');
      return res.json({ success: false, message: 'Lipsește emailul' });
    }

    // Obține calea directorului curent
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'primarii.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    const primarii = JSON.parse(raw);

    const found = primarii.find(
      (p) => p.email?.trim().toLowerCase() === emailDeVerificat.toLowerCase()
    );

    if (found) {
      log(`Email valid: ${emailDeVerificat}`);
      return res.json({
        success: true,
        message: 'Email valid pentru o primărie',
        primarie: found,
      });
    }

    return res.json({
      success: false,
      message: 'Emailul NU este asociat unei primării',
    });
  } catch (err) {
    error('Eroare în funcție: ' + err.message);
    return res.json({ success: false, message: err.message });
  }
};
