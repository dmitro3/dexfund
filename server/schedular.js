const cron = require("node-cron");
require("cross-fetch/polyfill");
const { createClient } = require("urql");
const { newFundCreatedEvents, holdingStates } = require("./graphql");

const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme",
});

const querying = async () => {
  const response = await client.query(newFundCreatedEvents).toPromise();
};

const init = () => {
  cron.schedule("* * * * *", () => {
    querying();
  });
};

module.exports = { init };
