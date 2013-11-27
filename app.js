
var Car = Backbone.Model.extend({
    defaults: {
        name: '',
        kpp: '',
        color: '',
        price: ''
    }
});
var oneCar = new Car();


//Cars collection
var CarsCollection = Backbone.Collection.extend({
    initialize: function () {
        this.fetch({ url: 'test.json' });
    },
    parse: function(response){
       return response.items;
    }
});
var cars = new CarsCollection();


//Car view
var CarView = Backbone.View.extend({
    tagName: 'li',
    template: _.template( $('#carsList').html() ),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    }
});

//Cars view
var CarsView = Backbone.View.extend({
    tagName: 'ul',
    render: function() {
        this.collection.each(function(oneCar) {
            var OneCarView = new CarView({model: oneCar});
            this.$el.append(OneCarView.render().el);
        }, this);
 
        return this;
    },
    initialize: function() {
        this.render();
    }
});
var list = new CarsView({collection: cars});

$(function() {
    $('.js-carList').append(list.render().el);
});


