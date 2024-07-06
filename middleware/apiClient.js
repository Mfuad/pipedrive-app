import pipedrive from "pipedrive"
import config from "../config.js";

export default async function apiClient(req, res, next) {
  console.log("api",pipedrive.ApiClient);
  const apiClient = new pipedrive.ApiClient();

  console.log(apiClient.authentications);

  let oauth2 = apiClient.authentications.oauth2;
  oauth2.clientId = config.clientId;
  oauth2.clientSecret = config.clientSecret;
  oauth2.redirectUri = config.redirectUri;

  req.apiClient = apiClient;

  next();
}
