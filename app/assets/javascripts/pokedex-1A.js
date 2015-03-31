Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var shortInfo = ["name", "poke_type"];
  var renderedContent = JST["pokemonListItem"]({pokemon: pokemon, shortInfo: shortInfo});
  this.$pokeList.append(renderedContent);
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  this.pokes.fetch({
    success: (function () {
      this.$pokeList.empty();
      this.pokes.each(this.addPokemonToList.bind(this));
    }).bind(this)
  });

  return this.pokes;
};
