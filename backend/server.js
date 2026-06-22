const express = require('express');
const cors = require('cors');
const contactosRouter = require('./routes/contactos');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/contactos', contactosRouter);

// Login de admin
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '12345';

app.post('/api/login', (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, message: 'Autenticación exitosa' });
  } else {
    res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API Guía Telefónica funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
