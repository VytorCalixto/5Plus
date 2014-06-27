var fom = angular.module('5+', ['ionic']);

fom.controller('GridCtrl', function($scope) {
    var white = "whitesmoke";
    var red = "#ef4e3a";
    var blue = "#4a87ee";
    var green = "#66cc33";
    var yellow = "#f0b840";
    var purple = "#8a6de9";
    var colors = [white, red, blue, green, yellow, purple];
    var gridSize = 9;

    function getRandomColor() {
        var index = Math.floor((Math.random() * 6));
        return {color: colors[index]};
    }

    function getRandomRow() {
        var row = [];
        for (var i = 0; i < gridSize; i++) {
            row.push(getRandomColor());
        }
        return row;
    }

    $scope.getRandomGrid = function() {
        //return [[{}]];
        var grid = [];
        for(var i=0; i< gridSize; i++){
            grid.push({cells: getRandomRow()});
        }
        return grid;
    };
});