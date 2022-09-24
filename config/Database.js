import { Sequelize } from "sequelize";

const db = new Sequelize('search_paginate', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;