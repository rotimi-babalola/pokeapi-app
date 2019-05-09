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
    try {
      const response = await this.axiosInstance.get(
        `/pokemon-species?offset=${offset}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param {string | number} idOrName - id or name of pokemon
   */
  async getPokemonSpecie(idOrName) {
    try {
      const response = await this.axiosInstance.get(
        `/pokemon-species?${idOrName}`,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getPokemonEvolutionData(id) {
    try {
      const response = await this.axiosInstance.get(`/evolution-chain/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

const pokeApiWrapper = new PokeAPIWrapper();

export default pokeApiWrapper;
