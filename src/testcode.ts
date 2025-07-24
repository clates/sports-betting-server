import {
  Slip,
  BookType,
  LineType,
  SportType,
  Game,
  SlipWithIP,
  Halfslip,
  GenericSlip,
  CombinedSlip,
} from "./data/types";
import { games, slips } from "./data/slips";
import {
  checkArbitrageOpportunity,
  filterArbitrageOpportunities,
} from "./OldDustShow";
import { printObj } from "./data/formatting";
import { translateJSONToHalfslips } from "./bigballs";
import { getSampleData } from "./data/dataExplorer";
let dataFromStream: any[] = getSampleData(50);
console.log("\n=== DATA FROM STREAM ===");
let halfSlipsFromDataStream: Halfslip[] = [];
dataFromStream.forEach((item, index) => {
  halfSlipsFromDataStream.concat(translateJSONToHalfslips(item));
});
export function fetchAllSlips(): Halfslip[] {
  return Object.keys(slips).flatMap((gameId) => {
    return slips[gameId].map((slip) => ({
      ...slip,
      gameId: gameId,
      IP: 420,
      outcome: "placeholder", // Placeholder, adjust as needed
      odds: 69, // Placeholder, adjust as needed
      line: 42069, // Placeholder, adjust as needed
      link: "bar", // Placeholder, adjust as needed
      IPs: Object.keys(slip.odds).reduce((acc, outcome) => {
        acc[outcome] = convertDecimalOddsToImpliedProbability(
          convertAmericanOddsToDecimal(slip.odds[outcome])
        );
        return acc;
      }, {}),
    }));
  });
}

export function splitSlipsIntoHalfSlips(spreadSlips: SlipWithIP[]): Halfslip[] {
  return spreadSlips.flatMap((slip) =>
    Object.entries(slip.odds).map(([outcome, odds]) => ({
      bookType: slip.bookType,
      gameId: slip.gameId,
      lineType: slip.lineType,
      line: 42069,
      link: "bar", // Placeholder, adjust as needed
      outcome,
      odds,
      IP: slip.IPs[outcome],
    }))
  );
}

const Combined = combineHalfSlips(halfSlipsFromDataStream);
// printObj("Combined Halfslips:", Combined.slice(0, 10));
export function getCombinations<T>(arr: T[], comboSize: number): T[][] {
  if (comboSize === 1) return arr.map((item) => [item]);
  const combos: T[][] = [];
  arr.forEach((current, idx) => {
    const smallerCombos = getCombinations(arr.slice(idx + 1), comboSize - 1);
    smallerCombos.forEach((combo) => combos.push([current, ...combo]));
  });
  return combos;
}

export function cartesianProduct<T>(...arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (acc, curr) => acc.flatMap((a) => curr.map((b) => [...a, b])),
    [[]]
  );
}

export const arbitrageOpportunities = Combined.filter((combo) => {
  const comboIP = Object.keys(combo.outcomes).map(
    (outcome) => combo.outcomes[outcome].IP
  );
  return arbitrageOpportunityIsAvailable(comboIP);
});
printObj("Arbitrage Opportunities!", arbitrageOpportunities.slice(0, 10));

printObj(
  "Sorted by Greatest Profit Guaranteed:",
  sortByGreatestProfitGuaranteed(arbitrageOpportunities).slice(0, 20)
);

//._.-._.-._.-._.-._.Xx_Definitions below this_xX

export let FetchandFilterTC = sortByGreatestProfitGuaranteed;
// filter the remaining slips by greatest profit guaranteed profit to least greatest profit gaurenteed( if the combination of two IP's is lower that means guarnteed profit is higher)
export function sortByGreatestProfitGuaranteed(
  goombagrizzles: CombinedSlip[]
): CombinedSlip[] {
  // Find Guaranteed Profit by subtracting TotalIP from 1 regardless if it's IpA or IpB
  return goombagrizzles.sort((a, b) => {
    const totalIPSumA = Object.values(a.outcomes).reduce(
      (sum, outcome) => sum + outcome.IP,
      0
    );
    const totalIPSumB = Object.values(b.outcomes).reduce(
      (sum, outcome) => sum + outcome.IP,
      0
    );
    const profitA = 1 - totalIPSumA;
    const profitB = 1 - totalIPSumB;
    // Put the profits into order with the smallest profit first
    return profitB - profitA;
  });
}
export function arbitrageOpportunityIsAvailable(ips: number[]): boolean {
  return ips.reduce((sum, ip) => sum + ip, 0) < 1;
}
export function combineHalfSlips(HalfSlips: Halfslip[]): CombinedSlip[] {
  // Group by gameId
  const grouped: { [gameIdAndLineType: string]: Halfslip[] } = {};
  HalfSlips.forEach((slip) => {
    if (!grouped[slip.gameId + slip.lineType])
      grouped[slip.gameId + slip.lineType] = [];
    grouped[slip.gameId + slip.lineType].push(slip);
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
          IP: halfslip.IP,
        };
      });
      combined.push({
        gameId: combo[0].gameId,
        lineType: combo[0].lineType,
        line: 6,
        link: "www.ican'tnamevariables.com",
        outcomes,
      });
    });
  });
  return combined;
}

export function convertAmericanOddsToDecimal(americanOdds) {
  if (americanOdds > 0) {
    return americanOdds / 100 + 1;
  } else {
    return 100 / Math.abs(americanOdds) + 1;
  }
}

//given DO convert the values into Implied Probability (IP) using the formula 1/DO
export function convertDecimalOddsToImpliedProbability(decimalOdds) {
  return Math.round((1 / decimalOdds) * 1000) / 1000;
}
export function Profitibility(IPs: number) {
  return Math.round((1 - IPs) * 1000) / 1000;
}
