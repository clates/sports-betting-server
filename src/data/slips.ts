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
  arbSoccer1: [
    {
      bookType: BookType.DraftKings,
      gameId: "arbSoccer1",
      lineType: LineType.Money,
      odds: {
        home: +110, // Best home odds
        away: +140,
        draw: +120,
      },
    },
    {
      bookType: BookType.FanDuel,
      gameId: "arbSoccer1",
      lineType: LineType.Money,
      odds: {
        home: +180,
        away: +130, // Best away odds
        draw: +110,
      },
    },
    {
      bookType: BookType.BetMGM,
      gameId: "arbSoccer1",
      lineType: LineType.Money,
      odds: {
        home: +200,
        away: +150,
        draw: +150, // Best draw odds
      },
    },
  ],
  soccergame1: [
    {
      bookType: BookType.DraftKings,
      gameId: "soccergame1",
      lineType: LineType.Money,
      odds: {
        home: -200,
        away: +150,
        draw: +250,
      },
    },
    {
      bookType: BookType.FanDuel,
      gameId: "soccergame1",
      lineType: LineType.Money,
      odds: {
        home: -110,
        away: +120,
        draw: +200,
      },
    },
    {
      bookType: BookType.BetMGM,
      gameId: "soccergame1",
      lineType: LineType.Money,
      odds: {
        home: -105,
        away: +125,
        draw: +180,
      },
    },
  ],
  soccergame2: [
    {
      bookType: BookType.Caesars,
      gameId: "soccergame2",
      lineType: LineType.Money,
      odds: {
        home: -120,
        away: +130,
        draw: +210,
      },
    },
    {
      bookType: BookType.PointsBet,
      gameId: "soccergame2",
      lineType: LineType.Money,
      odds: {
        home: +250,
        away: -115,
        draw: +220,
      },
    },
    {
      bookType: BookType.BetRivers,
      gameId: "soccergame2",
      lineType: LineType.Money,
      odds: {
        home: -130,
        away: +135,
        draw: +230,
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
      lineType: LineType.Touchdowns,
      odds: {
        home: -110,
        away: +130,
      },
    },
    //     {
    //       bookType: BookType.PointsBet,
    //       gameId: "arbitrageGame1",
    //       lineType: LineType.Touchdowns,
    //       odds: {
    //         home: -105,
    //         away: +125,
    //       },
    //     },
    //     {
    //       bookType: BookType.BetRivers,
    //       gameId: "arbitrageGame1",
    //       lineType: LineType.Money,
    //       odds: {
    //         home: +120,
    //         away: -115,
    //       },
    //     },
    ,
  ],

  arbitrageHorseRace1: [
    {
      bookType: BookType.DraftKings,
      gameId: "arbitrageHorseRace1",
      lineType: LineType.Money,
      odds: {
        horse1: +320, // Best odds for horse1 (IP: ~0.238)
        horse2: +450,
        horse3: +580,
        horse4: +750,
        horse5: +890,
        horse6: +1100,
        horse7: +1200,
        horse8: +1350,
        horse9: +1450,
        horse10: +1600,
      },
    },
    {
      bookType: BookType.FanDuel,
      gameId: "arbitrageHorseRace1",
      lineType: LineType.Money,
      odds: {
        horse1: +300,
        horse2: +520, // Best odds for horse2 (IP: ~0.161)
        horse3: +560,
        horse4: +720,
        horse5: +980, // Best odds for horse5 (IP: ~0.093)
        horse6: +1080,
        horse7: +1180,
        horse8: +1300,
        horse9: +1550, // Best odds for horse9 (IP: ~0.061)
        horse10: +1580,
      },
    },
    {
      bookType: BookType.BetMGM,
      gameId: "arbitrageHorseRace1",
      lineType: LineType.Money,
      odds: {
        horse1: +290,
        horse2: +480,
        horse3: +650, // Best odds for horse3 (IP: ~0.133)
        horse4: +740,
        horse5: +950,
        horse6: +1200, // Best odds for horse6 (IP: ~0.077)
        horse7: +1220,
        horse8: +1450, // Best odds for horse8 (IP: ~0.065)
        horse9: +1480,
        horse10: +1550,
      },
    },
    {
      bookType: BookType.Caesars,
      gameId: "arbitrageHorseRace1",
      lineType: LineType.Money,
      odds: {
        horse1: +950,
        horse2: +500,
        horse3: +620,
        horse4: +820, // Best odds for horse4 (IP: ~0.109)
        horse5: +930,
        horse6: +1150,
        horse7: +1320, // Best odds for horse7 (IP: ~0.070)
        horse8: +1380,
        horse9: +1520,
        horse10: +1750, // Best odds for horse10 (IP: ~0.054)
      },
    },
  ],
};
