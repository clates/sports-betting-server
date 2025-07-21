import { Slip, SlipWithIP } from "./data/types";
import { fetchAndFilter } from "./FetchFilter";

//calculate the amount of money(AoM) hat I place on each slip if I had 100$(Sm) by using the formula(AoM = Sm*(IP/TIP)), TIP is the IP of home team and away team combined or total ip
function calculateBetAmounts(slip: SlipWithIP, availableToBet: number) {
  return {
    homeTeamBet:
      availableToBet * (slip.homeTeamIP / (slip.awayTeamIP + slip.homeTeamIP)),
    awayTeamBet:
      availableToBet * (slip.awayTeamIP / (slip.awayTeamIP + slip.homeTeamIP)),
  };
}

//// Do stuff down here not above

let highProfitibilitySlips = fetchAndFilter();
console.log("High Profitibility Slips:", highProfitibilitySlips);
let startingAmount = 100;
console.log("Starting Amount:", startingAmount);
// For each slip calculate the amount of money to bet on each slip
// Here's how to map over the slips:
let TeamBetAmounts = highProfitibilitySlips.map((slip) => {
  console.log("Processing slip:", slip);
  return calculateBetAmounts(slip, startingAmount);
});
console.log("Bet Amounts for each slip:", TeamBetAmounts);
