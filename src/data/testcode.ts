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
} from "../data/types";
import { games, slips } from "../data/slips";
import {
  convertAmericanOddsToDecimal,
  convertDecimalOddsToImpliedProbability,
  checkArbitrageOpportunity,
  filterArbitrageOpportunities,
  sortByGreatestProfitGuaranteed,
} from "../FetchFilter";

export function fetchAllSlips(): GenericSlip[] {
  return Object.keys(slips).flatMap((gameId) => {
    return slips[gameId].map((slip) => ({
      ...slip,
      gameId: gameId,
    }));
  });
}
console.log("Halfslips:", splitSlipsIntoHalfSlips(fetchAllSlips()));
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
console.log(
  "Combined Halfslips:",
  combineHalfSlips(splitSlipsIntoHalfSlips(fetchAllSlips()))
);
export function combineHalfSlips(HalfSlips: Halfslip[]): any[] {
  // Group by gameId
  const grouped: { [gameId: string]: Halfslip[] } = {};
  HalfSlips.forEach((slip) => {
    if (!grouped[slip.gameId]) grouped[slip.gameId] = [];
    grouped[slip.gameId].push(slip);
  });

  // For each game, generate all unique pairs of outcomes
  const combined: any[] = [];
  Object.values(grouped).forEach((slips) => {
    for (let i = 0; i < slips.length; i++) {
      for (let j = i + 1; j < slips.length; j++) {
        // Only combine if outcomes are different
        if (slips[i].outcome !== slips[j].outcome) {
          combined.push({
            gameId: slips[i].gameId,
            lineType: slips[i].lineType,
            outcomes: {
              [slips[i].outcome]: {
                bookType: slips[i].bookType,
                odds: slips[i].odds,
              },
              [slips[j].outcome]: {
                bookType: slips[j].bookType,
                odds: slips[j].odds,
              },
            },
          });
        }
      }
    }
  });
  return combined;
}
