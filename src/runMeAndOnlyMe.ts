import { translateJSONToHalfslips } from "./bigballs";
import { getSampleData } from "./data/dataExplorer";
import { Halfslip } from "./data/types";
import { runClient } from "./fetchFromBolt";

let streamPromise = runClient();
streamPromise.then((dataFromStream: any[]) => {
  console.log("\n=== DATA FROM STREAM ===");
  let halfSlipsFromDataStream: Halfslip[] = [];
  dataFromStream.forEach((item, index) => {
    halfSlipsFromDataStream.concat(translateJSONToHalfslips(item));
  });

  // I want to translate this halfslip array into .....

  //
});
