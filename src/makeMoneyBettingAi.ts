import { games } from "./data/slips";
import { CombinedSlip, Slip, SlipWithIP } from "./data/types";
import { FetchandFilterTC } from "./testcode";
import { printObj } from "./data/formatting";

//calculate the amount of money(AoM) that I place on each outcome if I had 100$(Sm) by using the formula(AoM = Sm*(IP/TIP)), TIP is the total IP of all outcomes combined
function calculateBetAmounts(
  slip: CombinedSlip,
  availableToBet: number
): CombinedSlip {
  const totalIP = Object.values(slip.outcomes).reduce(
    (sum, outcome) => sum + outcome.IP,
    0
  );

  const updatedOutcomes = { ...slip.outcomes };

  Object.entries(slip.outcomes).forEach(([outcomeName, outcomeData]) => {
    const betAmount = availableToBet * (outcomeData.IP / totalIP);
    updatedOutcomes[outcomeName] = {
      ...outcomeData,
      stake: parseFloat(betAmount.toFixed(2)),
    };
  });

  return {
    ...slip,
    outcomes: updatedOutcomes,
  };
}

//// Do stuff down here not above

let highProfitibilitySlips = FetchandFilterTC();
console.log("High Profitibility Slips:", highProfitibilitySlips);
let startingAmount = 100;
console.log("Starting Amount:", startingAmount);
// For each slip calculate the amount of money to bet on each slip
// Here's how to map over the slips:
let TeamBetAmounts = highProfitibilitySlips.map((slip) => {
  return calculateBetAmounts(slip, startingAmount);
});
printObj("Processing slip:", TeamBetAmounts);
// console.log("Bet Amounts for each slip:", TeamBetAmounts);
// Object.keys(games).forEach((gameId) => {
//   const count = TeamBetAmounts.filter((slip) => slip.gameId === gameId).length;
//   console.log(`Game ID ${gameId}: ${count} combined slips`);
// });
