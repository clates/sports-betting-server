import { CombinedSlip, Slip, SlipWithIP } from "./data/types";
import { arbitrageOpportunities, FetchandFilterTC } from "./testcode";
import { printObj } from "./data/formatting";
import { getSampleData } from "./data/dataExplorer";
import { translateJSONToHalfslips } from "./bigballs";
import { slips } from "./data/slips";

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

let highProfitibilitySlips = FetchandFilterTC(arbitrageOpportunities);
// console.log("High Profitibility Slips:", highProfitibilitySlips);
let startingAmount = 100;
console.log("Starting Amount:", startingAmount);
// For each slip calculate the amount of money to bet on each slip
// Here's how to map over the slips:
let TeamBetAmounts = highProfitibilitySlips.map((slip) => {
  return calculateBetAmounts(slip, startingAmount);
});
printObj("Processing slip:", TeamBetAmounts);
console.log("Bet Amounts for each slip:", TeamBetAmounts);
Object.keys(slips).forEach((gameId) => {
  const count = TeamBetAmounts.filter((slip) => slip.gameId === gameId).length;
  console.log(`Game ID ${gameId}: ${count} combined slips`);
});

// let examplePrint = TeamBetAmounts[0];
// console.log(
//   `**** ----- **** \x1b[36m${examplePrint.gameId}\x1b[0m **** ----- ****`
// );
// const totalIP = Object.values(examplePrint.outcomes).reduce(
//   (sum, outcome) => sum + outcome.IP,
//   0
// );
// const totalProfit = 1 - totalIP;
// Object.keys(examplePrint.outcomes).forEach((outcome) => {
//   const colorCodeBook = (bookType: string) => {
//     switch (bookType) {
//       case "dk":
//         return "\x1b[32m"; // Blue for DraftKings
//       case "fd":
//         return "\x1b[94m"; // Green for FanDuel
//       case "mgm":
//         return "\x1b[33m"; // Yellow for BetMGM
//       case "crs":
//         return "\x1b[93m"; // Magenta for Caesars
//       case "pb":
//         return "\x1b[36m"; // Cyan for PointsBet
//       case "br":
//         return "\x1b[37m"; // White for BetRivers
//       case "barstool":
//         return "\x1b[90m"; // Gray for Barstool
//       case "bet365":
//         return "\x1b[91m"; // Red for Bet365
//       default:
//         return "\x1b[0m"; // Default color
//     }
//   };
//   const data = examplePrint.outcomes[outcome];
//   console.log(`Book:\t${colorCodeBook(data.bookType)}${data.bookType}\x1b[0m`);
//   console.log(`IP:\t${data.IP}`);
//   console.log(`Odds:\t${data.odds}`);
//   console.log(`Stake:\t\x1b[92m\x1b[1m\x1b[4m\x1b[5m${data.stake}\x1b[0m`);
//   console.log(
//     `Profit:  \x1b[46m\x1b[1m${(totalProfit * 100).toFixed(2)}%\x1b[0m`
//   );
//   console.log("\x1b[90m-----------------------------------\x1b[0m");
// });

// let dataFromStream: any[] = getSampleData(3);
// console.log("\n=== DATA FROM STREAM ===");
// dataFromStream.forEach((item, index) => {
//   printObj(translateJSONToHalfslips(item), `Item ${index + 1}`);
// });
