import pipedrive from "pipedrive";
import config from "../config.js";

export default async (req, res, next) => {
  const apiClient = new pipedrive.ApiClient();

  let oauth2 = apiClient.authentications.oauth2;
  oauth2.clientId = config.clientId;
  oauth2.clientSecret = config.clientSecret;
  oauth2.redirectUri = config.redirectUri;

  req.apiClient = apiClient;

  next();
};
