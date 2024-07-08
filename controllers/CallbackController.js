import { dbDelete, dbGetClient, dbSave } from "../db/oauth.js";

export const getCallback = async (req, res, next) => {
  try {
    const authCode = req.query.code;

    const tokens = await req.apiClient.authorize(authCode);

    const companyId = tokens.refresh_token.split(":")[0];
    const userId = tokens.refresh_token.split(":")[1];

    await dbSave(userId, companyId, tokens);

    res.json(await dbGetClient(userId, companyId));
  } catch (error) {
    next(error);
  }
};

export const deleteCallback = async (req, res) => {
  try {
    const basicAuthHeader = Buffer.from(
      `${config.clientId}:${config.clientSecret}`
    ).toString("base64");

    if (`Basic ${basicAuthHeader}` !== req.headers.authorization) {
      res.status(401);
      return res.send("Unauthorized");
    }

    const { user_id: userId, company_id: companyId } = req.body;

    await dbDelete(userId, companyId);

    res.send("ok");
  } catch (error) {
    next(error);
  }
};
