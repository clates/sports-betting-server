export enum BookType {
  DraftKings = "dk",
  FanDuel = "fd",
  BetMGM = "mgm",
  Caesars = "crs",
  PointsBet = "pb",
  BetRivers = "br",
  Barstool = "barstool",
  Bet365 = "bet365",
}

export enum SportType {
  Football = "Football",
  Basketball = "Basketball",
}

export enum LineType {
  Spread = "Spread",
  OverUnder = "OverUnder",
  Touchdowns = "Touchdowns",
  Money = "Money",
}

export interface Game {
  id: string;
  sport: SportType;
  time: number;
  place: string;
  homeTeam: string;
  awayTeam: string;
}

export interface Slip {
  bookType: BookType;
  gameId: string;
  lineType: LineType;
  homeTeamLine: number;
  awayTeamLine: number;
  homeTeamOdds: number;
  awayTeamOdds: number;
}
export interface SlipWithIP extends GenericSlip {
  IPs: { [outcome: string]: number };
}
export interface Halfslip {
  bookType: BookType;
  gameId: string;
  lineType: LineType;
  IP: number;
  outcome: string; // e.g. "home", "away", "draw", "overtime"
  odds: number;
  line: number; // e.g. spread, over/under
  link: string; // URL to the bet slip
}
export interface CombinedSlip {
  gameId: string;
  lineType: LineType;
  line: number; // e.g. spread, over/under
  link: string; // URL to the bet slip
  outcomes: {
    [outcome: string]: {
      IP: number;
      bookType: BookType;
      odds: number;
      stake?: number;
    };
    // Optional profit field
  };
  profit?: number;
}
export interface GenericSlip {
  bookType: BookType;
  gameId: string;
  lineType: LineType;
  odds: { [outcome: string]: number }; // outcome could be "home", "away", "draw", etc.
}

export interface BettableLine {
    [line: number]: {
      [outcome: string]: {
        bookType: BookType;
        odds: number;
        link: string; // URL to the bet slip
        IP:number;
      };
    };
}

export interface GameBestSlips {
  gameId: string;
  lines: {
  [lineType: string]: BettableLine;
  }
}