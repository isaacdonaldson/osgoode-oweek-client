const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
const numToTwoDigits = (num: number): string => (num > 9 ? `${num}` : `0${num}`);

const globalPass = "secretpassdonttell";

export {capitalize, numToTwoDigits, globalPass};
