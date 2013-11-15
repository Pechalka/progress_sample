//---------------------------------------
// Company Collection
// ---------------
// The collection of companies is backed by *localStorage* instead of a remote
// server.
//---------------------------------------
var CompanyList = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: Company,

 // localStorage: new Store("company-cachirulo"),
  url : '/api/all',


  // Companies are sorted by their name
  comparator: function(company) {
    return company.get('name');
  },

  remove_all: function (){
    var model;
    while (model = this.pop()){
      model.destroy();
    }
  }
});