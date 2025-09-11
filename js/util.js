//Рандомное положительное число в заданном пределе
const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export {getRandomInt};
