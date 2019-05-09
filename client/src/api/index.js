import axiosInstance from '../config/axios-config';

class PokeAPIWrapper {
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  /**
   *
   * @param {number} limit - number of items to get
   * @param {number} offset - page number to get
   */
  async getAllPokemonSpecies(limit = 20, offset = 0) {
    return this.axiosInstance.get(
      `/pokemon-species?offset=${offset}&limit=${limit}`,
    );
  }

  /**
   *
   * @param {string | number} idOrName - id or name of pokemon
   */
  async getPokemonSpecie(idOrName) {
    return this.axiosInstance.get(`/pokemon-species?${idOrName}`);
  }

  async getPokemonEvolutionData(id) {
    return this.axiosInstance.get(`/evolution-chain/${id}`);
  }
}

const pokeApiWrapper = new PokeAPIWrapper();

export default pokeApiWrapper;
