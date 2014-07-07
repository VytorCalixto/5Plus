fom.factory('Colors', function(){
    //Colors
    var blank = "whitesmoke";
    var red = "#ef4e3a";
    var blue = "#4a87ee";
    var green = "#66cc33";
    var yellow = "#f0b840";
    var purple = "#8a6de9";
    var colors = [blank, red, blue, green, yellow, purple];
    
    return{
        all: function(){
            return colors;
        },
        getByPosition: function(position){
            return getByPosition(position);
        },
        getBlank: function(){
            return blank;
        },
        getRandomColor: function(){
            var index = Math.floor((Math.random() * 5)) + 1;
            return getByPosition(index);
        }
    };
    
    function getByPosition(position){
        return colors[position];
    }
});