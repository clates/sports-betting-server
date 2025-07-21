export enum BookType {
  DraftKings = "dk",
  FanDuel = "fd",
  BetMGM = "mgm",
  Caesars = "caesars",
  PointsBet = "pointsbet",
  BetRivers = "betrivers",
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
export interface SlipWithIP extends Slip {
  homeTeamIP: number;
  awayTeamIP: number;
}
