import pipedrive from "pipedrive";
import { dbGetClient } from "../db/oauth.js";

export const createDeal = async (req, res, next) => {
  try {
    const params = new URLSearchParams(req.headers.referer);

    const data = req.body;

    const [userId, companyId] = [params.get("userId"), params.get("companyId")];

    const tokens = await dbGetClient(userId, companyId);

    let { oauth2 } = req.apiClient.authentications;

    oauth2.accessToken = tokens.dataValues.access_token;
    oauth2.refreshToken = tokens.dataValues.refresh_token;

    const dealsApi = new pipedrive.DealsApi(req.apiClient);
    const fieldsApi = new pipedrive.DealFieldsApi(req.apiClient);

    const dealFields = await fieldsApi.getDealFields();

    const dealKeys = {};
    for (let id in dealFields.data) {
      dealKeys[dealFields.data[id].name] = dealFields.data[id].key;
    }

    const finalData = {
      title: "Job#",
    };
    for (let name in data) {
      if (!dealKeys[name]) continue;
      finalData[dealKeys[name]] = data[name];
    }

    const newDeal = await dealsApi.addDeal(finalData);
    await dealsApi.updateDeal(newDeal.data.id, {
      title: `Job#${newDeal.data.id}`,
    });

    res.send(newDeal.data.id.toString());
  } catch (error) {
    next(error);
  }
};
