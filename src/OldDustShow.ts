import {
  Slip,
  BookType,
  LineType,
  SportType,
  Game,
  SlipWithIP,
  Halfslip,
  CombinedSlip,
  GenericSlip,
} from "./data/types";
import { slips } from "./data/slips";
import { cartesianProduct } from "./testcode";

// Function for fetching all slips from all books
export function fetchAllSlips(): GenericSlip[] {
  return Object.keys(slips).flatMap((gameId) => {
    return slips[gameId].map((slip) => ({
      ...slip,
      gameId: gameId,
    }));
  });
}

//let allSlips = fetchAllSlips()

// Take AllSlips and filter by linetype

// Take the slips with linetype spread and split the slips into two, having an home team halfslip and awayteam halfslip
export function splitSlipsIntoHalfSlips(
  spreadSlips: GenericSlip[]
): Halfslip[] {
  return spreadSlips.flatMap((slip) =>
    Object.entries(slip.odds).map(([outcome, odds]) => ({
      bookType: slip.bookType,
      gameId: slip.gameId,
      lineType: slip.lineType,
      outcome,
      odds,
    }))
  );
}
export function combineHalfSlips(HalfSlips: Halfslip[]): CombinedSlip[] {
  // Group by gameId
  const grouped: { [gameId: string]: Halfslip[] } = {};
  HalfSlips.forEach((slip) => {
    if (!grouped[slip.gameId]) grouped[slip.gameId] = [];
    grouped[slip.gameId].push(slip);
  });

  const combined: CombinedSlip[] = [];
  Object.values(grouped).forEach((slips) => {
    // Group slips by outcome
    const byOutcome: { [outcome: string]: Halfslip[] } = {};
    slips.forEach((slip) => {
      if (!byOutcome[slip.outcome]) byOutcome[slip.outcome] = [];
      byOutcome[slip.outcome].push(slip);
    });

    const outcomeGroups = Object.values(byOutcome);
    if (outcomeGroups.length < 2) return; // skip games with <2 outcomes

    // Cartesian product: all sets with exactly one slip per outcome
    const combos = cartesianProduct(...outcomeGroups);

    combos.forEach((combo) => {
      const outcomes: CombinedSlip["outcomes"] = {};
      combo.forEach((halfslip) => {
        outcomes[halfslip.outcome] = {
          bookType: halfslip.bookType,
          odds: halfslip.odds,
        };
      });
      combined.push({
        gameId: combo[0].gameId,
        lineType: combo[0].lineType,
        outcomes,
      });
    });
  });
  return combined;
}

//Given a slip converting the american odds(AO) to decimal odds(DO) (((AO/100)+1) for positive AO; ((100/AO)+1)for negative AO)
export function convertAmericanOddsToDecimal(americanOdds) {
  if (americanOdds > 0) {
    return americanOdds / 100 + 1;
  } else {
    return 100 / Math.abs(americanOdds) + 1;
  }
}
//given DO convert the values into Implied Probability (IP) using the formula 1/DO
export function convertDecimalOddsToImpliedProbability(decimalOdds) {
  return 1 / decimalOdds;
}
//Given the IP of slips add two slips' IPs together to see if an arbitrage opportunity exists(IP1+IP2<1)
export function checkArbitrageOpportunity(ip1, ip2) {
  return ip1 + ip2 < 1;
}
//If the IP's do not present an arbitrage opportunity throw the slip away
export function filterArbitrageOpportunities(
  spreadSlips: SlipWithIP[]
): SlipWithIP[] {
  return spreadSlips.filter((slip) => {
    const ip = onvertDecimalOddsToImpliedProbability(
      onvertAmericanOddsToDecimal(slip.homeTeamOdds)
    );
    const awayIp = convertDecimalOddsToImpliedProbability(
      convertAmericanOddsToDecimal(slip.awayTeamOdds)
    );
    return checkArbitrageOpportunity(ip, awayIp);
  });
}
//filter the remaining slips by greatest profit guaranteed profit to least greatest profit gaurenteed( if the combination of two IP's is lower that means guarnteed profit is higher)
export function sortByGreatestProfitGuaranteed(
  spreadSlips: SlipWithIP[]
): SlipWithIP[] {
  // Find Guaranteed Profit by subtracting TotalIP from 1 regardless if it's IpA or IpB
  return spreadSlips.sort((a, b) => {
    const profitA = 1 - (a.homeTeamIP + a.awayTeamIP);
    const profitB = 1 - (b.homeTeamIP + b.awayTeamIP);
    // Put the profits into order with the smallest profit first
    return profitA - profitB;
  });
}

//Input the slips(Home/Away team Odds and Lines) with lintype:'spread' into a formula
function calculateSpreadOdds(spreadSlips: Slip[]): any {
  return spreadSlips.map((slip) => {
    const { homeTeamOdds, awayTeamOdds, homeTeamLine, awayTeamLine } = slip;
    // Example calculation: Adjust odds based on line
    const adjustedHomeOdds = homeTeamOdds * (homeTeamLine / 100);
    const adjustedAwayOdds = awayTeamOdds * (awayTeamLine / 100);
    return {
      ...slip,
      adjustedHomeOdds,
      adjustedAwayOdds,
    };
  });
}
//Give the amount of money to bet on each slip
function calculateBetAmounts(spreadSlips, totalAmount) {
  const totalOdds = spreadSlips.reduce(
    (sum, slip) => sum + slip.adjustedHomeOdds + slip.adjustedAwayOdds,
    0
  );
  return spreadSlips.map((slip) => {
    const betAmount =
      (totalAmount * (slip.adjustedHomeOdds + slip.adjustedAwayOdds)) /
      totalOdds;
    return {
      ...slip,
      betAmount,
    };
  });
}
// Give the book to place the indivuidal amounts of money on each slip
function placeBetsOnBooks(betAmounts) {
  return betAmounts.map((slip) => {
    // Example logic to determine book based on previous formula
    const adjustedHomeOdds = slip.adjustedHomeOdds;
    const adjustedAwayOdds = slip.adjustedAwayOdds;
    // Assuming we have two books, Book A and Book B, with different odds
    // This is a simplified example; in a real scenario, you would have more complex logic
    // to determine which book to use based on odds, lines, etc.

    const book =
      slip.adjustedHomeOdds > slip.adjustedAwayOdds ? "Book A" : "Book B";
    return {
      ...slip,
      book,
    };
  });
}

export function fetchAndFilter(debug = false): SlipWithIP[] {
  //// Main function to run the betting AI logic
  debug && console.log("Starting Betting AI...");
  let allSlips = fetchAllSlips();
  // log allSlips
  debug && console.log("Fetched all slips:", allSlips);
  // let spreadSlips = filterSlipsByLineType(allSlips, "Spread");
  // debug && console.log("Filtered spread slips:", spreadSlips);
  let halfslips = splitSlipsIntoHalfSlips(allSlips);
  debug && console.log("Split into half slips:", halfslips);
  let combinedHalfSlips = combineHalfSlips(halfslips);
  debug && console.log("Combined half slips:", combinedHalfSlips);
  // For every slip I need decimal odds for the home and away team using theconverting the american odds(AO) to decimal odds(DO) (((AO/100)+1) for positive AO; ((100/AO)+1)for negative AO)
  let decimalSpreadSlips = combinedHalfSlips.map((slip) => ({
    ...slip,
    homeTeamDecimalOdds: convertAmericanOddsToDecimal(slip.homeTeamOdds),
    awayTeamDecimalOdds: convertAmericanOddsToDecimal(slip.awayTeamOdds),
  }));
  debug && console.log("Decimal spread slips:", decimalSpreadSlips);
  //Given the IP of slips add two slips' IPs together to see if an arbitrage opportunity exists(IP1+IP2<1)

  let DOtoIP: SlipWithIP[] = decimalSpreadSlips.map((slip) => ({
    ...slip,
    homeTeamIP: convertDecimalOddsToImpliedProbability(
      slip.homeTeamDecimalOdds
    ),
    awayTeamIP: convertDecimalOddsToImpliedProbability(
      slip.awayTeamDecimalOdds
    ),
  }));
  debug &&
    console.log("Converted Decimal Odds to Implied Probability:", DOtoIP);
  let arbitrageOpportunities = filterArbitrageOpportunities(DOtoIP);
  debug &&
    console.log("Filtered arbitrage opportunities:", arbitrageOpportunities);

  let sortedByProfit = sortByGreatestProfitGuaranteed(arbitrageOpportunities);
  debug && console.log("Sorted by greatest profit guaranteed:", sortedByProfit);
  return sortedByProfit as SlipWithIP[];
}
