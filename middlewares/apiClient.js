import pipedrive from "pipedrive";
import "dotenv/config";

const apiClient = async (req, res, next) => {
  const apiClient = new pipedrive.ApiClient();

  let oauth2 = apiClient.authentications.oauth2;
  oauth2.clientId = process.env.clientId;
  oauth2.clientSecret = process.env.clientSecret;
  oauth2.redirectUri = process.env.redirectUri;

  req.apiClient = apiClient;

  next();
};

export default apiClient;
