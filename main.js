"use strict";

const SUITS = "♠♥♦♣";
const NAMES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

let toName = el => {
  if (el.length === 3) {
    let name = el.substr(0, 2);
    if (NAMES.includes(name)) {
      return name;
    } else {
      return false;
    }
  } else if (el.length === 2) {
    let name1 = el.substr(0, 1);
    if (NAMES.includes(name1)) {
      return name1;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

let toSuit = el => {
  if (el.length === 3) {
    let suit = el.substr(2, 1);
    if (SUITS.split("").includes(suit)) {
      return suit;
    } else {
      return false;
    }
  } else if (el.length === 2) {
    let suit1 = el.substr(1, 1);
    if (SUITS.split("").includes(suit1)) {
      return suit1;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

let isValidCard = el => {
  return toName(el) && toSuit(el) ? true : false;
};

let isValidHand = el => {
  if (el.length > 5 || el.length < 5) return false;
  return el.every(isValidCard);
};

let compareCards = (a, b) => {
  a = a.replace(/['♠♥♦♣']/g, "");
  b = b.replace(/['♠♥♦♣']/g, "");
  if (NAMES.indexOf(a) > NAMES.indexOf(b)) return 1;
  if (NAMES.indexOf(a) < NAMES.indexOf(b)) return -1;
  if (NAMES.indexOf(a) === NAMES.indexOf(b)) return 0;
};

let sortHand = el => {
  if (isValidHand(el)) {
    return el.sort(compareCards);
  } else {
    return false;
  }
};

let isFlush = el => {
  let suits = SUITS.split("");
  if (el.every(x => x.includes(suits[0]))) return true;
  if (el.every(x => x.includes(suits[1]))) return true;
  if (el.every(x => x.includes(suits[2]))) return true;
  if (el.every(x => x.includes(suits[3]))) return true;
  return false;
};

let isStraight = el => {
  let straight = sortHand(el)
    .join("")
    .replace(/['♠♥♦♣']/g, "");

  let names = NAMES.join("");
  return names.includes(straight) ? true : false;
};

let isStraightFlush = el => {
  return isFlush(el) && isStraight(el) ? true : false;
};

let isRoyalFlush = el => {
  return sortHand(el)
    .join("")
    .replace(/['♠♥♦♣']/g, "")
    .includes("10JQKA") && isFlush(el)
    ? true
    : false;
};
console.log(toName("10♣"));
console.log(toSuit("9♣"));
console.log(isValidCard("10♥"));
console.log(isValidCard("9X"));
console.log(isValidHand(["9♣", "10♦", "9♠", "9♥", "10♥"]));
console.log(sortHand(["9♦", "Q♥", "10♥", "2♣", "2♠"]));
console.log(sortHand(["2♦", "Q♥", "2♥", "2♣", "2♠"]));
console.log(isFlush(["7♥", "2♥", "Q♥", "10♥", "5♥"]));
console.log(isFlush(["7♥", "2♥", "Q♥", "10♥", "5♥"]));
console.log(isFlush(["7♥", "2♥", "Q♥", "10♣", "5♥"]));
console.log(isStraight(["J♥", "Q♦", "K♥", "A♣", "10♥"]));
console.log(isStraightFlush(["5♥", "6♥", "7♠", "8♥", "9♥"]));
console.log(isRoyalFlush(["K♥", "A♥", "Q♥", "10♥", "J♥"]));
console.log(isRoyalFlush(["10♥", "J♥", "Q♥", "K♣", "A♥"]));
console.log(isRoyalFlush(["10♥", "J♥", "Q♥", "K♥", "A♥"]));
console.log(isRoyalFlush(["K♥", "A♥", "Q♥", "10♥", "J♥"]));
console.log(isRoyalFlush(["10♥", "J♥", "Q♥", "K♣", "A♥"]));
