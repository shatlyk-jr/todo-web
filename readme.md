## INSTALLATION

cd backend
npm init -y
npm install express sequelize sequelize-cli pg cors --prefer-offline

npx sequelize-cli init

# Create database by the name from /config/config.json

createdb db_todoapp
npx sequelize-cli model:generate --name Task --attributes title:string,description:text,completed:boolean
npx sequelize-cli db:migrate

backend: node server.js
frontend: npm start
