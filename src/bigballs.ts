import { BookType, Halfslip, LineType } from "./data/types";
import {
  convertAmericanOddsToDecimal,
  convertDecimalOddsToImpliedProbability,
} from "./testcode";

// Sportsbook name mapping - this is that fire lookup table we talked about!
const SPORTSBOOK_MAPPING = {
  draftkings: BookType.DraftKings,
  fanduel: BookType.FanDuel,
  betmgm: BookType.BetMGM,
  caesars: BookType.Caesars,
  pointsbet: BookType.PointsBet,
  betrivers: BookType.BetRivers,
  barstool: BookType.Barstool,
  bet365: BookType.Bet365,
};

export function translateJSONToHalfslips(jsonData: any): Halfslip[] {
  const halfslips: Halfslip[] = [];

  // Extract the main data we need
  const { data } = jsonData;
  const gameId = data.info.game_id;
  const sportsbook = data.sportsbook;

  // Map the sportsbook name to our BookType enum
  const bookType = SPORTSBOOK_MAPPING[sportsbook];
  if (!bookType) {
    console.warn(`Unknown sportsbook: ${sportsbook}`);
    return []; // Skip if we don't recognize the sportsbook
  }

  // Loop through each outcome and create a Halfslip
  Object.entries(data.outcomes).forEach(
    ([outcomeKey, outcomeData]: [string, any]) => {
      // Skip outcomes that don't have odds (those incomplete ones we saw!)
      if (!outcomeData.odds) {
        console.warn(`Skipping outcome ${outcomeKey} - missing odds`);
        return;
      }

      // Convert the American odds string to a number first
      const americanOdds = parseInt(outcomeData.odds);

      // Calculate IP using your existing functions
      const decimalOdds = convertAmericanOddsToDecimal(americanOdds);
      const IP = convertDecimalOddsToImpliedProbability(decimalOdds);

      // Create the Halfslip object
      const halfslip: Halfslip = {
        bookType: bookType,
        gameId: gameId,
        lineType: LineType.Spread, // All your data is spread bets
        IP: IP,
        outcome: outcomeData.outcome_target, // e.g. "Cleveland Guardians"
        odds: americanOdds,
        line: outcomeData.outcome_line, // e.g. 6, -4, -1.5
        link: outcomeData.link,
      };

      halfslips.push(halfslip);
    }
  );

  return halfslips;
}

// ...existing code...
