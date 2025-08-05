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
  GameBestSlips,
} from "./data/types";
import { games, slips } from "./data/slips";
import {
  checkArbitrageOpportunity,
  filterArbitrageOpportunities,
} from "./OldDustShow";
import { printObj } from "./data/formatting";
import { translateJSONToHalfslips } from "./bigballs";
import { getSampleData } from "./data/dataExplorer";
 
// let dataFromStream: any[] = getSampleData(50);
// console.log("\n=== DATA FROM STREAM ===");
// let halfSlipsFromDataStream: Halfslip[] = [];
// dataFromStream.forEach((item, index) => {
//   halfSlipsFromDataStream.concat(translateJSONToHalfslips(item));
// });
// export function fetchAllSlips(): Halfslip[] {
//   return Object.keys(slips).flatMap((gameId) => {
//     return slips[gameId].map((slip) => ({
//       ...slip,
//       gameId: gameId,
//       IP: 420,
//       outcome: "placeholder", // Placeholder, adjust as needed
//       odds: 69, // Placeholder, adjust as needed
//       line: 42069, // Placeholder, adjust as needed
//       link: "bar", // Placeholder, adjust as needed
//       IPs: Object.keys(slip.odds).reduce((acc, outcome) => {
//         acc[outcome] = convertDecimalOddsToImpliedProbability(
//           convertAmericanOddsToDecimal(slip.odds[outcome])
//         );
//         return acc;
//       }, {}),
//     }));
//   });
// }

// export function splitSlipsIntoHalfSlips(spreadSlips: SlipWithIP[]): Halfslip[] {
//   return spreadSlips.flatMap((slip) =>
//     Object.entries(slip.odds).map(([outcome, odds]) => ({
//       bookType: slip.bookType,
//       gameId: slip.gameId,
//       lineType: slip.lineType,
//       line: 42069,
//       link: "bar", // Placeholder, adjust as needed
//       outcome,
//       odds,
//       IP: slip.IPs[outcome],
//     }))
//   );
// }


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


//   const comboIP = Object.keys(combo.outcomes).map(
//     (outcome) => combo.outcomes[outcome].IP
//   );
//   return arbitrageOpportunityIsAvailable(comboIP);
// });
// printObj("Arbitrage Opportunities!", arbitrageOpportunities.slice(0, 10));

// printObj(
//   "Sorted by Greatest Profit Guaranteed:",
//   sortByGreatestProfitGuaranteed(arbitrageOpportunities).slice(0, 20)
// );

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
export function filterHalfSlips(
  halfslips: Halfslip[],
  gameId: string,
  lineType: LineType,
  line: number
): Halfslip[] {
  return halfslips.filter(
    (halfslip) =>
      halfslip.gameId === gameId &&
      halfslip.lineType === lineType &&
      halfslip.line === line
  );
}
export function findLowestIP(
  halfslips: Halfslip[],
  gameId: string,
  lineType: LineType,
  line: number,
  outcome: string
): number | undefined {
  // Start with Infinity so any real IP will be lower
  let lowestIP = Infinity;
  halfslips.forEach((halfslip) => {
    if (
      halfslip.gameId === gameId &&
      halfslip.lineType === lineType &&
      halfslip.line === line &&
      halfslip.outcome === outcome
    ) {
      if (halfslip.IP < lowestIP) {
        lowestIP = halfslip.IP;
      }
    }
  });
  return lowestIP === Infinity ? undefined : lowestIP;
}

export function groupHalfslipsToGameBestSlips(halfslips: Halfslip[]): GameBestSlips[] {
  const grouped: { [gameId: string]: GameBestSlips } = {};

  halfslips.forEach((halfslip) => {
    if (!grouped[halfslip.gameId]) {
      grouped[halfslip.gameId] = {
        gameId: halfslip.gameId,
        lines: {},
      };
    }
    const lines = grouped[halfslip.gameId].lines;
    const lineTypeKey = halfslip.lineType;
    if (!lines[lineTypeKey]) {
      lines[lineTypeKey] = {};
    }
    // Use actual line value as key to pair +X with -X
    const lineKey = halfslip.line;
    if (!lines[lineTypeKey][lineKey]) {
      lines[lineTypeKey][lineKey] = {};
    }
    // Store by outcome as key, matching BettableLine structure
    lines[lineTypeKey][lineKey][halfslip.outcome] = {
      bookType: halfslip.bookType,
      odds: halfslip.odds,
      link: halfslip.link,
      IP: halfslip.IP
    };
  });

  // Now, for each positive line, find its negative counterpart with different outcome
  const result: GameBestSlips[] = [];
  Object.values(grouped).forEach((gameBestSlip) => {
    const newLines: any = {};
    Object.entries(gameBestSlip.lines).forEach(([lineType, lineGroups]) => {
      newLines[lineType] = {};
      Object.entries(lineGroups).forEach(([lineKey, outcomes]) => {
        const line = parseFloat(lineKey);
        if (line > 0) {
          // Look for the negative counterpart
          const negativeLineKey = (-line).toString();
          const negativeOutcomes = lineGroups[negativeLineKey];
          
          if (negativeOutcomes && Object.keys(outcomes).length > 0 && Object.keys(negativeOutcomes).length > 0) {
            // Find pairs with different outcomes
            Object.entries(outcomes).forEach(([positiveOutcome, positiveSlip]) => {
              Object.entries(negativeOutcomes).forEach(([negativeOutcome, negativeSlip]) => {
                if (positiveOutcome !== negativeOutcome) {
                  const absLine = Math.abs(line);
                  if (!newLines[lineType][absLine]) {
                    newLines[lineType][absLine] = {};
                  }
                  newLines[lineType][absLine][positiveOutcome] = positiveSlip;
                  newLines[lineType][absLine][negativeOutcome] = negativeSlip;
                }
              });
            });
          }
        }
      });
    });
    if (Object.keys(newLines).some(lineType => Object.keys(newLines[lineType]).length > 0)) {
      result.push({
        gameId: gameBestSlip.gameId,
        lines: newLines
      });
    }
  });

  return result;
}
export function getLowestIPHalfslips(halfslips: Halfslip[]): GameBestSlips[] {
  const grouped: { [gameId: string]: GameBestSlips } = {};

  halfslips.forEach((halfslip) => {
    if (!grouped[halfslip.gameId]) {
      grouped[halfslip.gameId] = {
        gameId: halfslip.gameId,
        lines: {},
      };
    }
    const lines = grouped[halfslip.gameId].lines;
    const lineTypeKey = halfslip.lineType;
    if (!lines[lineTypeKey]) {
      lines[lineTypeKey] = {};
    }
    const absLine = Math.abs(halfslip.line);
    if (!lines[lineTypeKey][absLine]) {
      lines[lineTypeKey][absLine] = {};
    }
    // Only keep the lowest IP for each outcome
    const outcomeKey = halfslip.outcome;
    if (
      !lines[lineTypeKey][absLine][outcomeKey] ||
      halfslip.IP < lines[lineTypeKey][absLine][outcomeKey].IP
    ) {
      lines[lineTypeKey][absLine][outcomeKey] = { ...halfslip };
    }
  });

  // Only keep groups with at least two different outcomes (e.g., "home" and "away")
return Object.values(grouped).map(group => {
  const filteredLines: any = {};
  Object.entries(group.lines).forEach(([lineType, absLineGroups]) => {
    filteredLines[lineType] = {};
    Object.entries(absLineGroups).forEach(([absLine, outcomes]) => {
      // Get all unique outcome names
      const outcomeNames = Object.values(outcomes).map(o => (o as Halfslip).outcome);
      const uniqueOutcomes = Array.from(new Set(outcomeNames));
      // Only keep if there are at least two different outcome names
      if (uniqueOutcomes.length >= 2 && uniqueOutcomes[0] !== uniqueOutcomes[1]) {
        // Only include if outcomes are different
        const filteredOutcomes: any = {};
        uniqueOutcomes.forEach(name => {
          filteredOutcomes[name] = (Object.values(outcomes) as Halfslip[]).find(o => o.outcome === name);
        });
        filteredLines[lineType][absLine] = filteredOutcomes;
      }
    });
  });
  return {
    gameId: group.gameId,
    lines: filteredLines
  };
});
}
export function filterArbitragePairs(groups: GameBestSlips[]): GameBestSlips[] {
  return groups
    .map(group => {
      const filteredLines: any = {};
      Object.entries(group.lines).forEach(([lineType, absLineGroups]) => {
        filteredLines[lineType] = {};
        Object.entries(absLineGroups).forEach(([absLine, pair]) => {
          if (pair.plus && pair.minus) {
            const combinedIP = pair.plus.IP + pair.minus.IP;
            if (combinedIP < 1) {
              filteredLines[lineType][absLine] = {
                plus: pair.plus,
                minus: pair.minus,
                combinedIP
              };
            }
          }
        });
      });
      return {
        gameId: group.gameId,
        lines: filteredLines
      };
    })
    // Only keep groups with at least one arbitrage pair
    .filter(group =>
      Object.values(group.lines).some(
        (absLineGroups: any) =>
          Object.keys(absLineGroups).length > 0
      )
    );
}