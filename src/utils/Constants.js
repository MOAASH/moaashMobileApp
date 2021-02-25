const ICON_BASE_URL = '../../assets/';

export const FacebookLogo = require(ICON_BASE_URL + 'fb-logo.png');

export function titleize(sentence) {
  if(!sentence.split("_")) return sentence;
  var _titleizeWord = function(string) {
          return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      },
      result = [];
  sentence.split("_").forEach(function(w) {
      result.push(_titleizeWord(w));
  });
  return result.join(" ");
}