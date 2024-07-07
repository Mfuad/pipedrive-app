export const getCallback = async (req, res) => {
  const authCode = req.query.code;

  try {
    const tokens = await req.apiClient.authorize(authCode);

    const companyId = tokens.access_token.split(":")[0];
    const userId = tokens.access_token.split(":")[1];

    res.json({
      ...tokens,
      userId,
      companyId,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteCallback = async (req, res) => {
  const basicAuthHeader = Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString("base64");

  if (`Basic ${basicAuthHeader}` !== req.headers.authorization) {
    res.status(401);
    return res.send("Unauthorized");
  }

  res.send("ok");
};
