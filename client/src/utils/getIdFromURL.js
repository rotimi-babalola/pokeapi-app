/**
 * Extracts the id from a URL
 * For example, given - 'https://pokeapi.co/api/v2/pokemon-species/14/'
 * it returns 14
 * @param {string} url - url to extract id from
 */
export const getIdFromURL = url => {
  // remove last '/'
  const newURL = url.substring(0, url.length - 1);

  // get last index of '/'
  const id = newURL.substring(newURL.lastIndexOf('/') + 1);
  return id;
};
