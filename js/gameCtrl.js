fom.controller('GameCtrl', function($scope, Grid, Colors) {

    var nextColors;
    var numberOfColors;
    var cellsSelected = [];
    $scope.score = 0;
    initializeGame();

    function initializeGame() {
        Grid.setGridSize(9); //later I'll do it setting the difficulty of the match
        numberOfColors = 3;
        Grid.initializeGrid();
        drawNextColors();
        addNextColorsToGrid();
        document.querySelector('game-grid').rows = Grid.getGrid();
    }

    /*
     * raffle next colors
     */
    function drawNextColors() {
        nextColors = [];
        for (var i = 0; i < numberOfColors; i++) {
            nextColors.push(getRandomColor());
        }
        document.querySelector('next-colors-bar').colors = nextColors;
    }

    function addNextColorsToGrid() {
        for (var i = 0; i < numberOfColors; i++) {
            var cell = getRandomBlankCell();
            Grid.addColorToCell(nextColors[i], cell);
        }
        drawNextColors();
    }

    function getRandomColor() {
        var index = Math.floor((Math.random() * 5)) + 1;
        return Colors.getByPosition(index);
    }

    function getRandomBlankCell() {
        do {
            var l = Math.floor(Math.random() * Grid.getGridSize());
            var c = Math.floor(Math.random() * Grid.getGridSize());
        } while (Grid.getCell(l, c).color !== Colors.getBlank());
        return Grid.getCell(l,c);
    }

    function validateSelection(cell) {
        if (cell.selected === true) {
            if (cellsSelected.length === 1) {
                if (cell.color !== Colors.getBlank()) {
                    unselect(cell);
                    return;
                }
            } else {
                if (cell.color === Colors.getBlank()) {
                    unselect(cell);
                    return;
                }
            }
            cellsSelected.push(cell);
        } else {
            cellsSelected = [];
        }

    }

    function validateMove() {
        if (cellsSelected.length === 2) {
            //if there is a way
            return true;
        }
        return false;
    }

    function moveCells() {
        var coloredCell = cellsSelected[0];
        var blankCell = cellsSelected[1];
        Grid.changeColorCell(coloredCell, blankCell);
        
        for (var c in cellsSelected) {
            unselect(cellsSelected[c]);
        }
        cellsSelected = [];
    }

    function validateGame() {
        console.log(Grid.getBlankCells());
        if(Grid.getBlankCells() <= 3){
            console.log('game over');
        }
    }

    function unselect(cell) {
        Grid.getCell(getCellX(cell), getCellY(cell)).selected = false;
    }

    function getCellX(cell) {
        return Math.floor(cell.id / Grid.getGridSize());
    }

    function getCellY(cell) {
        return cell.id % Grid.getGridSize();
    }

    document.querySelector('game-grid').addEventListener('selected', function(e) {
        document.querySelector('game-grid').rows = Grid.getGrid();
        validateSelection(e.detail);
        if (validateMove()) {
            moveCells();
            validateGame();
            addNextColorsToGrid();
        }
    });
});