import { translateJSONToHalfslips } from "./bigballs";
import { getSampleData } from "./data/dataExplorer";
import { printObj } from "./data/formatting";
import { Halfslip, LineType } from "./data/types";
import { runClient } from "./fetchFromBolt";
import { filterArbitragePairs, findLowestIP, getCombinations, getLowestIPHalfslips, groupHalfslipsToGameBestSlips } from "./testcode";
import { filterHalfSlips } from "./testcode";
 let streamPromise = runClient();
streamPromise.then((dataFromStream: any[]) => {
  console.log("\n=== DATA FROM STREAM ===");
   let halfSlipsFromDataStream: Halfslip[] = [];
 dataFromStream.forEach((item, index) => {
  // Try using push instead of concat!
  halfSlipsFromDataStream.push(...translateJSONToHalfslips(item));
});
if (halfSlipsFromDataStream.length > 0) {
  const grouped = groupHalfslipsToGameBestSlips(halfSlipsFromDataStream);
  printObj("Grouped GameBestSlips:", grouped);
  console.log("Grouped halfSlipsFromDataStream.length:", halfSlipsFromDataStream.length);
  console.log("Grouped GameBestSlips:", grouped.length);
}
if (halfSlipsFromDataStream.length > 0) {
  const grouped = groupHalfslipsToGameBestSlips(halfSlipsFromDataStream);
  // Run your filter function here!
  if (halfSlipsFromDataStream.length > 0) {
// Get lowest IP halfslips for each outcome, across books
const lowestIPGroups = getLowestIPHalfslips(halfSlipsFromDataStream);

// Now filter for arbitrage directly on lowestIPGroups
const arbitrageGroups = filterArbitragePairs(lowestIPGroups);
printObj("Arbitrage GameBestSlips (combined IP < 1):", arbitrageGroups);
console.log("Arbitrage groups count:", arbitrageGroups.length);
}
  const arbitrageGroups = filterArbitragePairs(grouped);
  printObj("Arbitrage GameBestSlips (combined IP < 1):", arbitrageGroups);
  console.log("Arbitrage groups count:", arbitrageGroups.length);
  printObj("Top 10 Arbitrage GameBestSlips:", arbitrageGroups.slice(0, 3));










// let gameIdTest =halfSlipsFromDataStream[0].gameId;
// console.log("Game ID from first half slip:", gameIdTest);
// let line = halfSlipsFromDataStream[0].line;
// console.log("Line from first half slip:", line);
// let lineTypeTest = halfSlipsFromDataStream[0].lineType;
// console.log("Line Type from first half slip:", lineTypeTest);
// let outcome = halfSlipsFromDataStream[0].outcome;
// console.log("Outcome from first half slip:", outcome);

// let LowIPSlip = findLowestIP(halfSlipsFromDataStream,
//   gameIdTest,
// lineTypeTest,
// line,
// outcome);

// console.log("Lowest IP Slip:", LowIPSlip);

// let dividedHalfSlips = filterHalfSlips(translateJSONToHalfslips);
// let combos = getCombinations(dividedHalfSlips, 2);
// console.log("Combinations:", combos);

}});
