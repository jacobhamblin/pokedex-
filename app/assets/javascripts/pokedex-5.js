Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
    // this.collection.save();
    // this.refreshPokemon();
    //     debugger
  },

  addPokemonToList: function (pokemon) {
    var shortInfo = ["name", "poke_type"];
    var renderedContent = JST["pokemonListItem"]({pokemon: pokemon, shortInfo: shortInfo});
    this.$el.append(renderedContent);
  },

  refreshPokemon: function (options) {
    this.collection.fetch({
      success: (function () {
        this.render();
      }).bind(this)
    })
  },

  render: function () {
    this.$el.empty();
    var that = this;
    this.collection.each (function (pokemon) {
      that.addPokemonToList(pokemon);
    });
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);
    var pokemon = this.collection.get($target.data("id"));
    var pokemonDetail = new Pokedex.Views.PokemonDetail({ model: pokemon });
    pokemonDetail.refreshPokemon();
    $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li": "selectToyFromList"

  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: function() {
        this.render();
      }.bind(this)
    })
  },

  render: function () {
    this.$el.html(JST["pokemonDetail"]({pokemon: this.model}));
    var that = this;
    that.model.toys().each (function (toy) {
      that.$el.find('ul.toys').append(JST["toyListItem"]({ toy: toy }))
    });
    return that;
  },

  selectToyFromList: function (event) {
    var $target = $(event.currentTarget);
    var toy = this.model.toys().get($target.data("id"));
    var toyDetail = new Pokedex.Views.ToyDetail({ model: toy })
    toyDetail.render();
    $("#pokedex .toy-detail").append(toyDetail.$el)
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    this.$el.empty();
    this.$el.append(JST["toyDetail"]({toy: this.model, pokes: []}))
    return this;
  }
});


$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);
});
