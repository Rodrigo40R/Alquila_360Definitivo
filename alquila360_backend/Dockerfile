# Usa una imagen oficial de Node.js
FROM node:20

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del proyecto
COPY . .

# Expone el puerto donde corre NestJS
EXPOSE 3000

# Comando para ejecutar el servidor en modo desarrollo
CMD ["npm", "run", "start:dev"]

