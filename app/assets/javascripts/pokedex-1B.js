Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $detail = $('<div class="detail">');
  $detail.append('<img src="' + pokemon.get('image_url') + '"><br>');
  for (var attr in pokemon.attributes) {
    if (pokemon.get(attr) && attr !== 'id' && attr !== 'image_url') {
      $detail.append(
        '<span style="font-weight:bold;">' + attr + ':</span> ' +
          pokemon.get(attr) + '<br>'
      );
    }
  }
  this.$pokeDetail.html($detail);

  this.$pokeDetail.append(
    '<span style="font-weight: bold;">Toys:</span><br>'
  );
  var $toys = $('<ul class="toys"></ul>');
  this.$pokeDetail.append($toys);

  pokemon.fetch({
    success: (function() {
      this.renderToysList(pokemon.toys());
    }).bind(this)
  });
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  this.$toyDetail.empty();

  var $target = $(event.currentTarget);

  var pokeId = $target.data('id');
  var pokemon = this.pokes.get(pokeId);

  this.renderPokemonDetail(pokemon);
};
