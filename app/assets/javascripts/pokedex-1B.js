Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var renderedContent = JST["pokemonDetail"]({pokemon: pokemon})
  this.$pokeDetail.html(renderedContent);

  // Phase 2C.
  // var $toys = $('<ul class="toys"></ul>');
  // this.$pokeDetail.append($toys);

  pokemon.fetch({
    success: (function() {

      this.renderToysList(pokemon.toys());
    }).bind(this)
  });
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  // Phase II
  this.$toyDetail.empty();

  // Phase IB
  var $target = $(event.currentTarget);

  var pokeId = $target.data('id');
  var pokemon = this.pokes.get(pokeId);

  this.renderPokemonDetail(pokemon);
};
