# Базовый образ Node.js
FROM node:18-alpine

# Установка рабочего каталога
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей, включая Nest CLI
RUN npm install --production
RUN npm install @nestjs/cli

# Копирование всех файлов проекта
COPY . .

# Компиляция TypeScript в JavaScript
RUN npm run build

# Открытие порта, на котором работает приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]
