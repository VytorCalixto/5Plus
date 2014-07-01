fom.factory('Grid', function(Colors) {

    //Grid size and grid
    var gridSize;
    var grid;
    var blankCells;

    return {
        getGrid: function() {
            return grid;
        },
        setGrid: function(newGrid) {
            grid = newGrid;
        },
        getGridSize: function() {
            return gridSize;
        },
        setGridSize: function(newGridSize) {
            gridSize = newGridSize;
        },
        initializeGrid: function() {
            initializeGrid();
        },
        getCell: function(x, y) {
            return grid[x][y];
        },
        addColorToCell: function(color, cell) {
            addColorToCell(color, cell);
            if(color !== Colors.getBlank()){
                blankCells--;
            }
        },
        changeColorCell: function(cellA, cellB){
            var color = cellB.color;
            addColorToCell(cellA.color, cellB);
            addColorToCell(color, cellA);
        },
        getBlankCells: function() {
            return blankCells;
        },
        removeCell: function(cell) {
            addColorToCell(Colors.getBlank(), cell);
            blankCells++;
        }
    };

    function createCell(id) {
        return {id: id, color: 'whitesmoke', selected: false};
    }

    function createRow(id) {
        var row = [];
        for (var i = 0; i < gridSize; i++) {
            row.push(createCell(i + (id * gridSize)));
            blankCells++;
        }
        return row;
    }

    function initializeGrid() {
        grid = [];
        blankCells = 0;
        for (var i = 0; i < gridSize; i++) {
            grid.push(createRow(i));
        }
    }

    function addColorToCell(color, cell) {
        var x = Math.floor(cell.id / gridSize);
        var y = cell.id % gridSize;
        grid[x][y].color = color;
    }

});