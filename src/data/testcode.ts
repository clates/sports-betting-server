import {
  Slip,
  BookType,
  LineType,
  SportType,
  Game,
  SlipWithIP,
  Halfslip,
} from "../data/types";
import { games } from "../data/slips";
import {
  splitSlipsIntoHalfSlips,
  fetchAllSlips,
  combineHalfSlips,
  convertAmericanOddsToDecimal,
  convertDecimalOddsToImpliedProbability,
  checkArbitrageOpportunity,
  filterArbitrageOpportunities,
  sortByGreatestProfitGuaranteed,
} from "../FetchFilter";

let allslips = fetchAllSlips();

allslips = allslips
  .filter(
    (slip) =>
      slip.bookType === BookType.DraftKings ||
      slip.bookType === BookType.BetMGM ||
      slip.bookType === BookType.Caesars ||
      slip.bookType === BookType.PointsBet ||
      slip.bookType === BookType.BetRivers ||
      slip.bookType === BookType.Barstool ||
      slip.bookType === BookType.Bet365 ||
      slip.bookType === BookType.FanDuel
  )
  .filter(
    (slip) =>
      slip.gameId === "arbitrageGame2" || slip.gameId === "arbitrageGame1"
  );

console.log("All slips:", allslips);
console.log("Starting Betting AI...");
// log allslips
console.log("Fetched all slips:", allslips);
let halfslips = splitSlipsIntoHalfSlips(allslips);
console.log("Split into half slips:", halfslips);
let combinedHalfSlips = combineHalfSlips(halfslips);
console.log("Combined half slips:", combinedHalfSlips);
// For every slip I need decimal odds for the home and away team using theconverting the american odds(AO) to decimal odds(DO) (((AO/100)+1) for positive AO; ((100/AO)+1)for negative AO)
let decimalSpreadSlips = combinedHalfSlips.map((slip) => ({
  ...slip,
  homeTeamDecimalOdds: convertAmericanOddsToDecimal(slip.homeTeamOdds),
  awayTeamDecimalOdds: convertAmericanOddsToDecimal(slip.awayTeamOdds),
}));
console.log("Decimal spread slips:", decimalSpreadSlips);
//Given the IP of slips add two slips' IPs together to see if an arbitrage opportunity exists(IP1+IP2<1)

let DOtoIP: SlipWithIP[] = decimalSpreadSlips.map((slip) => ({
  ...slip,
  homeTeamIP: convertDecimalOddsToImpliedProbability(slip.homeTeamDecimalOdds),
  awayTeamIP: convertDecimalOddsToImpliedProbability(slip.awayTeamDecimalOdds),
}));

console.log("Converted Decimal Odds to Implied Probability:", DOtoIP);
let arbitrageOpportunities = filterArbitrageOpportunities(DOtoIP);

console.log("Filtered arbitrage opportunities:", arbitrageOpportunities);

let sortedByProfit = sortByGreatestProfitGuaranteed(arbitrageOpportunities);
console.log("Sorted by greatest profit guaranteed:", sortedByProfit);
