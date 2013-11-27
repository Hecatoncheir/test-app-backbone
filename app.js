
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
    className: 'car-item',
    template: _.template( $('#cars-List').html() ),
    render: function() {
        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    },
    initialize: function() {
        return this.render();
    }
});

//Cars view
var CarsView = Backbone.View.extend({
    className: 'cars-items',
    length: function(){
        return this.collection.models.length;
    },
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

$('.js-show-list').one('click', function(){
    list.render();
    $('.js-tabs').css("visibility","visible");
    $('.counter-all').append(list.length());
    $('.js-car-List').append(list.el);
});



