import * as fs from "fs";
import * as path from "path";
import { printObj } from "./formatting";

// Load the collected data
const dataFilePath = path.join(__dirname, "../../data/collected-ws-data.json");

let collectedData: any[] = [];

// Function to load data from file
export function loadCollectedData(): any[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const rawData = fs.readFileSync(dataFilePath, "utf8");
      collectedData = JSON.parse(rawData);
      console.log(
        `Loaded ${collectedData.length} entries from ${dataFilePath}`
      );
      return collectedData;
    } else {
      console.log("No collected data file found yet");
      return [];
    }
  } catch (err) {
    console.error("Error loading data:", err);
    return [];
  }
}

// Helper functions for data exploration
export function getDataCount(): number {
  return collectedData.length;
}

export function getUniqueKeys(): string[] {
  const allKeys = new Set<string>();
  collectedData.forEach((item) => {
    if (typeof item === "object" && item !== null) {
      Object.keys(item).forEach((key) => allKeys.add(key));
    }
  });
  return Array.from(allKeys);
}

export function getDataTypes(): { [key: string]: string[] } {
  const types: { [key: string]: Set<string> } = {};

  collectedData.forEach((item) => {
    if (typeof item === "object" && item !== null) {
      Object.entries(item).forEach(([key, value]) => {
        if (!types[key]) types[key] = new Set();
        types[key].add(typeof value);
      });
    }
  });

  // Convert Sets to arrays
  const result: { [key: string]: string[] } = {};
  Object.entries(types).forEach(([key, typeSet]) => {
    result[key] = Array.from(typeSet);
  });

  return result;
}

export function getSampleData(count: number = 3): any[] {
  return collectedData.slice(0, count);
}

export function filterByProperty(property: string, value: any): any[] {
  return collectedData.filter(
    (item) =>
      typeof item === "object" && item !== null && item[property] === value
  );
}

// Main exploration function
export function exploreData(): void {
  loadCollectedData();

  console.log("\n=== DATA EXPLORATION ===");
  console.log(`Total entries: ${getDataCount()}`);
  console.log(`Unique keys: ${getUniqueKeys()}`);
  console.log(`Data types by key:`);
  printObj(getDataTypes());

  console.log("\n=== SAMPLE DATA ===");
  printObj(getSampleData());
}

// Auto-load data when imported
loadCollectedData();
