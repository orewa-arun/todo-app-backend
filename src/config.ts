import "dotenv/config";

const mongo_user = process.env.MONGO_USER;
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_database = process.env.MONGO_DATABASE;

export const mongo_uri = `mongodb+srv://${mongo_user}:${mongo_password}@todolist.ysi5213.mongodb.net/${mongo_database}`;