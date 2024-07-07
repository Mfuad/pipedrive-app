import pipedrive from "pipedrive";

export const createDeal = async (req, res) => {
  console.log("Sending request...");
  const api = new pipedrive.DealsApi(req.apiClient);
  console.log(await req.apiClient.authentications.api_key);
  const data = {
    title: "Deal of the century",
    value: 10000,
    currency: "USD",
    user_id: null,
    person_id: null,
    org_id: 1,
    stage_id: 1,
    status: "open",
    expected_close_date: "2022-02-11",
    probability: 60,
    lost_reason: null,
    visible_to: 1,
    add_time: "2021-02-11",
  };
  console.log("2");
  const response = await api.addDeal(data);
  console.log("Deal was added successfully!", response);
};
