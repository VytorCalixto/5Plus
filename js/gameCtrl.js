fom.controller('GameCtrl', function($scope, Grid, Colors) {

    var nextColors;
    var numberOfColors;
    var cellsSelected = [];
    var score;
    $scope.gameOver = false;
    initializeGame();

    function initializeGame() {
        Grid.setGridSize(5); //later I'll do it with different difficulties
        Grid.initializeGrid();
        numberOfColors = 3;
        score = 0;
        drawNextColors();
        addNextColorsToGrid(numberOfColors);
        document.querySelector('game-score').value = score;
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

    function addNextColorsToGrid(number) {
        for (var i = 0; i < number; i++) {
            var cell = getRandomBlankCell();
            cell.color = nextColors[i];
            Grid.addColorToCell(nextColors[i], cell);
            checkForFiveOrMore(cell);
        }
        drawNextColors();
    }

    function getRandomColor() {
        return Colors.getRandomColor();
    }

    function getRandomBlankCell() {
        do {
            var l = Math.floor(Math.random() * Grid.getGridSize());
            var c = Math.floor(Math.random() * Grid.getGridSize());
        } while (Grid.getCell(l, c).color !== Colors.getBlank());
        return Grid.getCell(l, c);
    }

    function validateSelection(cell) {
        if (cell.selected === true) {
            if (cellsSelected.length === 1) {
                if (cell.color !== Colors.getBlank()) {
                    unselect(cellsSelected[0]);
                    cellsSelected[0] = cell;
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
        //The fist cell in the array is always a colored cell
        var coloredCell = cellsSelected[0];
        //The second cell in the array is always a blank cell
        var blankCell = cellsSelected[1];
        Grid.changeColorCell(coloredCell, blankCell);

        /*
         * After swapping the cells colors, now the colored cell is in 
         * cellsSelected[1] position. But it's color is in cellsSelected[0]
         */
        //Make a cell to pass to the functions with the correct position and color
        var cell = cellsSelected[1];
        cell.color = cellsSelected[0].color;
        checkForFiveOrMore(cell);

        for (var c in cellsSelected) {
            unselect(cellsSelected[c]);
        }
        cellsSelected = [];
    }

    function validateGame() {
//        console.log(Grid.getBlankCells());
        if (Grid.getBlankCells() <= numberOfColors) {
            addNextColorsToGrid(Grid.getBlankCells());
            return false; //Game over
        }
        addNextColorsToGrid(numberOfColors);
        return true;
    }

    function checkForFiveOrMore(cell) {
        score += checkLine(cell) * 2;
        score += checkColumn(cell) * 2;
//        score += checkPrimaryDiagonal(cell);
//        score += checkSecondaryDiagonal(cell);
        document.querySelector('game-score').value = score;
    }

    function checkLine(cell) {
        var i = getCellY(cell), j = getCellY(cell), x = getCellX(cell);
        while ((i >= 0) && (cell.color === Grid.getCell(x, i).color)) {
            i--;
        }
        i++;
        while ((j < Grid.getGridSize()) && (cell.color === Grid.getCell(x, j).color)) {
            j++;
        }
        j--;
        if (j - i >= 4) {
            for (var k = i; k <= j; k++) {
                Grid.removeCell(Grid.getCell(x, k));
            }
            return j - i + 1;
        }
        return 0;
    }

    function checkColumn(cell) {
        var i = getCellX(cell), j = getCellX(cell), y = getCellY(cell);
        while ((i >= 0) && (cell.color === Grid.getCell(i, y).color)) {
            i--;
        }
        i++;
        while ((j < Grid.getGridSize()) && (cell.color === Grid.getCell(j, y).color)) {
            j++;
        }
        j--;
        if (j - i >= 4) {
            for (var k = i; k <= j; k++) {
                Grid.removeCell(Grid.getCell(k, y));
            }
            return j - i + 1;
        }
        return 0;
    }

    function checkPrimaryDiagonal(cell) {
        var leftCell = cell, rightCell = cell;
        /*
         * [leftCell]
         *          ...
         *           [cell]
         *                  ...
         *                      [rightCell]
         */
        while ((getCellX(leftCell) >0) && (getCellY(leftCell)>0) && (leftCell.color === cell.color)) {
            leftCell = Grid.getCell(getCellX(leftCell) - 1, getCellY(leftCell) - 1);
        }
        leftCell = Grid.getCell(getCellX(leftCell)+1, getCellY(leftCell)+1);
        
        while ((getCellX(rightCell) < Grid.getGridSize()) && (getCellY(rightCell) < Grid.getGridSize()) && (rightCell.color === cell.color)) {
            rightCell = Grid.getCell(getCellX(rightCell) + 1, getCellY(rightCell) + 1);
        }
        rightCell = Grid.getCell(getCellX(rightCell)-1, getCellY(rightCell)-1);
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
        }
    });
});