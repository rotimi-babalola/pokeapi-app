/**
 * Gets evolution chain data for a pokemon
 * @param {object} data - response from PokeAPI
 */
export const getEvolutionData = data => {
  const evolutionChain = [];
  let evolutionData = data.chain;

  do {
    const evoDetails = evolutionData.evolution_details[0];

    evolutionChain.push({
      species_name: evolutionData.species.name,
      min_level: evoDetails ? evoDetails.min_level : 1,
      trigger_name: evoDetails ? evoDetails.trigger.name : null,
      item: evoDetails ? evoDetails.item : null,
      url: evoDetails ? evolutionData.species.url : null,
    });

    evolutionData = evolutionData.evolves_to[0];
    return evolutionChain;
  } while (
    Boolean(evolutionData) &&
    evolutionData.hasOwnProperty('evolves_to')
  );
};
