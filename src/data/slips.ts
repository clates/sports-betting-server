import {
  Slip,
  BookType,
  LineType,
  SportType,
  Game,
  GenericSlip,
} from "./types";
export const games: { [key: string]: Game } = {
  arbitrageGame1: {
    id: "arbitrageGame1",
    sport: SportType.Football,
    time: 1633024800, // timestamp for 2021-10-01 12:00:00 UTC
    place: "FedEx Field",
    homeTeam: "Washington Football Team",
    awayTeam: "Los Angeles Chargers",
  },
  arbitrageGame2: {
    id: "arbitrageGame2",
    sport: SportType.Football,
    time: 1633024800, // timestamp for 2021-10-01 12:00:00 UTC
    place: "FedEx Field",
    homeTeam: "Washington Football Team",
    awayTeam: "Los Angeles Chargers",
  },
  game1: {
    id: "game1",
    sport: SportType.Football,
    time: 1633024800, // timestamp for 2021-10-01 12:00:00 UTC
    place: "FedEx Field",
    homeTeam: "Washington Football Team",
    awayTeam: "Los Angeles Chargers",
  },
  game2: {
    id: "game2",
    sport: SportType.Football,
    time: 1633035600, // timestamp for 2021-10-01 14:00:00 UTC
    place: "Bank of America Stadium",
    homeTeam: "Carolina Panthers",
    awayTeam: "New York Jets",
  },
  game3: {
    id: "game3",
    sport: SportType.Football,
    time: 1633046400, // timestamp for 2021-10-01 16:00:00 UTC
    place: "Lumen Field",
    homeTeam: "Seattle Seahawks",
    awayTeam: "Indianapolis Colts",
  },
  game4: {
    id: "game4",
    sport: SportType.Football,
    time: 1633057200, // timestamp for 2021-10-01 18:00:00 UTC
    place: "Gillette Stadium",
    homeTeam: "New England Patriots",
    awayTeam: "Miami Dolphins",
  },
  game5: {
    id: "game5",
    sport: SportType.Football,
    time: 1633068000, // timestamp for 2021-10-01 20:00:00 UTC
    place: "Arrowhead Stadium",
    homeTeam: "Kansas City Chiefs",
    awayTeam: "Cleveland Browns",
  },
  game6: {
    id: "game6",
    sport: SportType.Football,
    time: 1633078800, // timestamp for 2021-10-01 22:00:00 UTC
    place: "TIAA Bank Field",
    homeTeam: "Jacksonville Jaguars",
    awayTeam: "Houston Texans",
  },
  game7: {
    id: "game7",
    sport: SportType.Football,
    time: 1633089600, // timestamp for 2021-10-02 00:00:00 UTC
    place: "Mercedes-Benz Stadium",
    homeTeam: "Atlanta Falcons",
    awayTeam: "Philadelphia Eagles",
  },
  game8: {
    id: "game8",
    sport: SportType.Football,
    time: 1633100400, // timestamp for 2021-10-02 02:00:00 UTC
    place: "FedEx Field",
    homeTeam: "Washington Football Team",
    awayTeam: "Dallas Cowboys",
  },
  game9: {
    id: "game9",
    sport: SportType.Football,
    time: 1633111200, // timestamp for 2021-10-02 04:00:00 UTC
    place: "SoFi Stadium",
    homeTeam: "Los Angeles Rams",
    awayTeam: "Chicago Bears",
  },
  game10: {
    id: "game10",
    sport: SportType.Football,
    time: 1633122000, // timestamp for 2021-10-02 06:00:00 UTC
    place: "Lincoln Financial Field",
    homeTeam: "Philadelphia Eagles",
    awayTeam: "San Francisco 49ers",
  },
};

export const slips: { [key: string]: GenericSlip[] } = {
  soccergame1: [
    {
      bookType: BookType.DraftKings,
      gameId: "soccergame1",
      lineType: LineType.Spread,
      odds: {
        home: +200,
        away: -150,
        draw: +250,
      },
    },
  ],
  arbitrageGame1: [
    {
      bookType: BookType.DraftKings,
      gameId: "arbitrageGame1",
      lineType: LineType.Spread,
      odds: {
        home: +155,
        away: -110,
      },
    },
    {
      bookType: BookType.DraftKings,
      gameId: "arbitrageGame1",
      lineType: LineType.Money,
      odds: {
        home: +155,
        away: -110,
      },
    },
    {
      bookType: BookType.FanDuel,
      gameId: "arbitrageGame1",
      lineType: LineType.Touchdowns,
      odds: {
        home: -115,
        away: +140,
      },
    },
    {
      bookType: BookType.BetMGM,
      gameId: "arbitrageGame1",
      lineType: LineType.OverUnder,
      odds: {
        home: -110,
        away: +130,
      },
    },
    {
      bookType: BookType.PointsBet,
      gameId: "arbitrageGame1",
      lineType: LineType.Touchdowns,
      odds: {
        home: -105,
        away: +125,
      },
    },
    {
      bookType: BookType.BetRivers,
      gameId: "arbitrageGame1",
      lineType: LineType.Money,
      odds: {
        home: +120,
        away: -115,
      },
    },
  ],
};
