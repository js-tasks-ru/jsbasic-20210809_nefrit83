function getMinMax(str) {
  // ваш код...
  let array = [];
  let result = {};
  array = str
    .split(" ")
    .filter((item) => Number(item))
    .map((item) => Number(item))
    .sort(function (a, b) {
      return a - b;
    });

  return (result = {
    min: array[0],
    max: array[array.length - 1],
  });
}
