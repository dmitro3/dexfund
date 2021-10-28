const cron = require("node-cron");
require("cross-fetch/polyfill");
const { createClient } = require("urql");
const { newFundCreatedEvents, holdingStates } = require("./graphql");

const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme",
});

const querying = async () => {
  const response = await client.query(newFundCreatedEvents).toPromise();
  console.log(JSON.stringify(response.data, null, 2));
};

const init = () => {
  cron.schedule("* * * * *", () => {
    console.log("Running a task every minute ......");
    querying();
  });
};

module.exports = { init };
