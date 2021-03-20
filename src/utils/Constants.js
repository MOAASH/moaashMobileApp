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
};

export async function decorateErrors(errors) {
  error_array = []
  errors.forEach( (error) => {
    message = error.message;
    for ( error_key in message ){
      error_array = error_array.concat(message[error_key])
    }
  });
  return error_array;
};

export async function findErrorKey(errors, key) {
  error_key = false
  errors.forEach( async (error) => {
    message = error.message;
    for ( error_key_fetched in message ){
      if (error_key_fetched == key) {
        error_key = true
      }
    }
  });
  return error_key;
};

