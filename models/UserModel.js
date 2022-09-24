import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

/* create table user using sequelize */
const User = db.define('users',{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
},{
    freezeTableName: true
});

export default User;

/* if table users doesn't exist in db */
(async () => {
    await db.sync();
})();
