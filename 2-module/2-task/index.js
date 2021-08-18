function isEmpty(obj) {
  // ваш код...
  for (let key in obj) {
    if (key.length !== null) {
      return false;
    }
  }
  return true;
}
