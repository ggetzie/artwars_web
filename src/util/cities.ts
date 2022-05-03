import {randInt} from ".";
import {DutyMap} from "./types";
import SkylineNewYork from "../res/images/Skyline-NewYork.png";
import SkylineLondon from "../res/images/Skyline-London.png";
import SkylineMoscow from "../res/images/Skyline-Moscow.png";
import SkylineSanFrancisco from "../res/images/Skyline-SanFrancisco.png";
import SkylineLosAngeles from "../res/images/Skyline-LosAngeles.png";
import SkylineHongKong from "../res/images/Skyline-HongKong.png";
import SkylineDubai from "../res/images/Skyline-Dubai.png";

const Cities = {
  NewYork: "New York",
  London: "London",
  Moscow: "Moscow",
  SanFrancisco: "San Francisco",
  LosAngeles: "Los Angeles",
  HongKong: "Hong Kong",
  Dubai: "Dubai",
} as const;

const SkylineImages = {
  "New York": SkylineNewYork,
  London: SkylineLondon,
  Moscow: SkylineMoscow,
  "San Francisco": SkylineSanFrancisco,
  "Los Angeles": SkylineLosAngeles,
  "Hong Kong": SkylineHongKong,
  Dubai: SkylineDubai,
} as const;

function setupDuties(): DutyMap {
  const res = Object.fromEntries(
    Object.values(Cities).map((v) => [v, randInt(5, 21) * 0.01])
  );
  return res as DutyMap;
}

export {Cities, setupDuties, SkylineImages};
