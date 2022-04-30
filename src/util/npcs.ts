import {Categories, randomChoiceNR} from ".";
import {CityName, NPCData} from "./types";

export type OfferResponse =
  | "insulted"
  | "reject"
  | "accept"
  | "enthusiasm"
  | "repeatReject";

const NPCs = require("../res/data/npcs.json");

function setupNPCs(): NPCData[] {
  let prefs = randomChoiceNR(Object.values(Categories));
  let res: NPCData[] = [];
  for (const npc of NPCs) {
    res.push({index: npc.id, preference: prefs.selected});
    prefs = randomChoiceNR(prefs.remaining);
  }
  return res;
}

function getNPCForCity(city: CityName) {
  for (const npc of NPCs) {
    if (npc.city === city) {
      return npc;
    }
  }
  throw new Error(`No NPC found for city ${city}`);
}

function considerSell(
  value: number,
  offer: number,
  preferred: boolean,
  limit: number = 0
): OfferResponse {
  // NPC is considering to sell to the player
  if (offer <= limit) {
    // Once NPC has refused to sell at a price
    // they will not consider a lower price
    return "repeatReject";
  }
  const ratio = offer / value;
  const minRatio = preferred ? 0.915 : 0.7;
  const maxRatio = preferred ? 1.25 : 1.1;
  if (ratio < minRatio) {
    return "insulted";
  } else if (ratio > maxRatio) {
    return "enthusiasm";
  } else {
    const threshold = Math.exp(ratio) - Math.exp(minRatio);
    return Math.random() <= threshold ? "accept" : "reject";
  }
}

function considerBuy(
  value: number,
  asking: number,
  preferred: boolean,
  limit: number = Number.MAX_VALUE
): OfferResponse {
  // NPC is considering to buy from the player
  if (asking >= limit) {
    // Once NPC has refused to buy at a price
    // they will not consider a higher price
    return "repeatReject";
  }
  const ratio = asking / value;
  const base = 100;
  const minRatio = preferred ? 1.1 : 0.9;
  const maxRatio = preferred ? 2 : 1.5;

  if (ratio > maxRatio) {
    return "insulted";
  } else if (ratio < minRatio) {
    return "enthusiasm";
  } else {
    const threshold = Math.pow(base, -ratio) * (0.95 * base);
    return Math.random() >= threshold ? "accept" : "reject";
  }
}

const NPCImages = {
  aristocrat: require("../res/images/aristocrat.png"),
  artAppraiser: require("../res/images/art_appraiser.png"),
  artCop: require("../res/images/art_cop.png"),
  auctioneer: require("../res/images/auctioneer.png"),
  freeportOp: require("../res/images/freeport_op.png"),
  heiress: require("../res/images/heiress.png"),
  hollywoodActor: require("../res/images/hollywood_actor.png"),
  financier: require("../res/images/hongkong_financier.png"),
  irsAgent: require("../res/images/irs_agent.png"),
  oligarch: require("../res/images/russian_oligarch.png"),
  artDealer: require("../res/images/smarmy_art_dealer.png"),
  techBillionaire: require("../res/images/tech_billionaire.png"),
  prince: require("../res/images/the_prince.png"),
} as const;

export {setupNPCs, considerSell, considerBuy, getNPCForCity, NPCImages};
