export const strToArr = (str) => {
    // only split on commas that are not inside brackets or parentheses
    const arr = str.split(/,(?![^(]*\))/g);
    // remove whitespace
    arr.forEach((el, i) => (arr[i] = el.trim()));
    // remove brackets
    arr.forEach((el, i) => (arr[i] = el.replace(/[\[\]']+/g, "")));

    return arr;
  };
  