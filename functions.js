//Функция проверки длины строки
const getStringLength = (string, maxLength) => (string.length <= maxLength);

getStringLength('проверяемая строка', 10);

//Функция проверки строки на "полиндромность"

const getStringCheck = (string) => {
  const normalizeString = string.replaceAll(' ', '').toUpperCase();
  let testString = '';
  for (let i = (normalizeString.length - 1); i >= 0; i--) {
    testString += normalizeString.at(i);
  }
  return (normalizeString === testString);
};

getStringCheck ('Лёша на полке клопа нашёл');

//Функция извлечения чисел из строки
const stringToNumber = (string) => {
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    const checkedSymbol = parseInt(string[i], 10);
    const checkedNumber = Number.isNaN(checkedSymbol);
    if (!checkedNumber) {
      newString += checkedSymbol;
    }
  }
  return newString;
};

stringToNumber('полке 21312.5 год44');

//Сравнение времени
const timeCompare = function (start, end, meetStart, meetDuration) {
  const toMinutes = function (time) {
    const [hours, minutes] = time.split(':').map(Number);
    const minutesCount = hours * 60 + minutes;
    return minutesCount;
  };
  return !(
    toMinutes(meetStart) < toMinutes(start) ||
    toMinutes(meetStart) + meetDuration > toMinutes(end)
  );
};
console.log(timeCompare('8:00', '17:30', '08:00', 900));

