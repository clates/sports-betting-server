// spro-client.ts
import WebSocket from "ws";
import * as fs from "fs";
import * as path from "path";
import { GenericSlip } from "./data/types";

const uri = "wss://spro.agency/api?key=60fe5481-808c-4201-bd52-57a684d7cd01";

// Data collection setup
const collectedData: any[] = [];
const dataFilePath = path.join(__dirname, "../data/collected-ws-data.json");

// Ensure data directory exists
const dataDir = path.dirname(dataFilePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Function to write data to file
function writeDataToFile() {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(collectedData, null, 2));
    console.log(
      `Data written to ${dataFilePath} (${collectedData.length} entries)`
    );
  } catch (err) {
    console.error("Error writing data to file:", err);
  }
}

// Write data every 30 seconds and on process exit
setInterval(writeDataToFile, 30000);
process.on("SIGINT", () => {
  console.log("\nShutting down, writing final data...");
  writeDataToFile();
  process.exit(0);
});

export async function runClient() {
  while (true) {
    try {
      return await new Promise<any[]>((resolve, reject) => {
        const ws = new WebSocket(uri);

        ws.on("open", () => {
          console.log("WebSocket connection established");
        });

        ws.on("message", (data) => {
          const message = data.toString();
          console.log("Received:", message);

          // Send subscription message after initial ack
          const subscribeMessage = {
            action: "subscribe",
            filters: {
              sports: ["MLB"],
              //   sportsbooks: ['draftkings', 'betmgm'],
              //   games: [
              //     'San Francisco Giants vs Philadelphia Phillies, 2025-07-07, 09',
              //     'Corinthians vs Bragantino, 2025-07-13, 06'
              //   ],
              markets: ["Spread"],
            },
          };

          ws.send(JSON.stringify(subscribeMessage));

          // Implement this function and treat Data as it comes in and build the GenericSlip from the data
          let translateToMyObject = (data): GenericSlip => {
            return {
              bookType: data.bookType,
              gameId: data.gameId,
              lineType: data.lineType,
              odds: data.odds, // Assuming odds is already in the correct format
            } as GenericSlip; // Cast to GenericSlip type
          };
          // Switch to long-running listener
          ws.on("message", (data) => {
            const incoming = data.toString();
            try {
              const parsed = JSON.parse(incoming);

              // Add timestamp and collect data as-is
              collectedData.push(parsed);

              console.log("Data stream:");
              console.log(JSON.stringify(parsed, null, 2));
              let genericSlipTranslatedFromTheirData =
                translateToMyObject(parsed);
              console.log(
                "Resulting translated object:",
                genericSlipTranslatedFromTheirData
              );
              if (parsed.action != "initial_state") {
                resolve(collectedData);
              }
            } catch (err) {
              // Also collect raw data that fails to parse
              const dataEntry = {
                timestamp: new Date().toISOString(),
                rawData: incoming,
                parseError: true,
              };
              collectedData.push(dataEntry);

              console.log("Data stream (raw):", incoming);
            }
          });
        });

        ws.on("close", (code, reason) => {
          console.warn(`Connection closed — code: ${code}, reason: ${reason}`);
          resolve([]); // Allow outer loop to handle reconnect
        });

        ws.on("error", (err) => {
          console.error("WebSocket error:", err);
          ws.close();
          resolve([]);
        });
      });

      console.log("Reconnecting in 5s...");
      await new Promise((res) => setTimeout(res, 5000));
    } catch (err) {
      console.error("Unexpected error:", err);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}
