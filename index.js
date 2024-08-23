// ========================================
// 1. Module Imports
// ========================================
const express = require("express");
const { connectDB } = require("./src/utils/db");
const env = require("dotenv");
const cloudinary = require("cloudinary").v2;
const router = require("./src/api/routes/character.routes");

// ========================================
// 2. Environment Configuration
// ========================================
env.config(); // Load environment variables

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ========================================
// 3. Database Connection
// ========================================
connectDB(); // Initialize database connection

// ========================================
// 4. Express Application Setup
// ========================================
const server = express();
const PORT = process.env.PORT || 3000; // Define server port with default

// ========================================
// 5. Middleware Configuration
// ========================================
server.use(express.json()); // Middleware for parsing JSON bodies

// Add other middleware as needed:
// server.use(someMiddleware());

// ========================================
// 6. Route Handlers
// ========================================

// Add route handlers here:
// server.use('/api/v1/someRoute', someRouteHandler);
server.use("/", router);

// ========================================
// 7. Route Configuration
// ========================================

// Define routes
// server.get('/someRoute', (req, res) => {
//   res.send('Hello World!');
// });

// ========================================
// 8. Error Handling Middleware
// ========================================

// Add error handling middleware here:
// server.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// ========================================
// 9. Start the Server
// ========================================
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// ========================================
// 10. Future Enhancements
// ========================================

// This section can be used for any future additions or improvements
// e.g., Additional services, configuration, etc.

// ========================================
// Notes
// ========================================
// modelos --> estructuras de BD (colecciones),
// vistas, --> routes
// controladores--> funcionalidad para acceder a la BD
// utils--> funciones de validaciones, conexion de BD, middleware
