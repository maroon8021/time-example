const { DB_URL } = process.env;

module.exports = {
  type: "postgres",
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],

  logging: true,
  synchronize: false,
  url: DB_URL,
};
