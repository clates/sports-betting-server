// spro-client.ts
import WebSocket from "ws";

const uri = "wss://spro.agency/api?key=6dc74771-3c17-4671-b776-c4ef31343277";

async function runClient() {
  while (true) {
    try {
      await new Promise<void>((resolve, reject) => {
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

          // Switch to long-running listener
          ws.on("message", (data) => {
            const incoming = data.toString();
            try {
              const parsed = JSON.parse(incoming);
              console.log("Data stream:");
              console.log(JSON.stringify(parsed, null, 2));
            } catch (err) {
              console.log("Data stream (raw):", incoming);
            }
          });
        });

        ws.on("close", (code, reason) => {
          console.warn(`Connection closed — code: ${code}, reason: ${reason}`);
          resolve(); // Allow outer loop to handle reconnect
        });

        ws.on("error", (err) => {
          console.error("WebSocket error:", err);
          ws.close();
          resolve();
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

runClient();
