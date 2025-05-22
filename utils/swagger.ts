import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from "dotenv"
dotenv.config()

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fast nFood ',
      version: '1.0.0',
      description: 'Fast Food loyihasi uchun API hujjati',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3005}`,
        description: 'Mahalliy server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routers/*.ts'], // Router fayllar yo‘li
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;