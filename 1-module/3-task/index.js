function ucFirst(str) {
  // ваш код...
  if (str.length > 0) {
    let newStr = str[0].toUpperCase() + str.slice(1, str.length);
    return newStr;
  } else {
    return "";
  }
}
