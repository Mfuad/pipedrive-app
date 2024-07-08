import { DataTypes, Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  logging: false,
});

export const Client = db.define("Clients", {
  access_token: DataTypes.STRING,
  token_type: DataTypes.STRING,
  expires_in: DataTypes.NUMBER,
  refresh_token: DataTypes.STRING,
  scope: DataTypes.STRING,
  api_domain: DataTypes.STRING,
  userId: DataTypes.STRING,
  companyId: DataTypes.STRING,
});

await Client.sync({ force: false });

export async function dbSave(userId, companyId, tokens) {
  const client = await Client.findOne({ where: { userId, companyId } });
  if (client === null) {
    console.log("new user");
    await Client.create({
      ...tokens,
      userId,
      companyId,
    });
  }
}
export async function dbDelete(userId, companyId) {
  await Client.destroy({
    where: {
      userId,
      companyId,
    },
  });
}

export async function dbGetClient(userId, companyId) {
  return await Client.findOne({ where: { userId, companyId } });
}
