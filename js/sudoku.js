// DATA DEFINITIONS 
//


// Example Boards
//

const b = null

let bd1 = [ [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9]]


let bd2 = [ [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b]]


let bd3 = [ [b, b, b, b, b, 8, 9, 1, b],
            [b, b, 1, b, b, b, b, b, 3],
            [9, b, b, b, 2, 7, b, b, 5],
            [3, b, 2, 5, 6, b, b, b, b],
            [5, b, b, b, b, b, b, b, 8],
            [b, b, b, b, 8, 3, 5, b, 4],
            [8, b, b, 7, 4, b, b, b, 2],
            [6, b, b, b, b, b, 1, b, b],
            [b, 5, 7, 3, b, b, b, b, b]]


let bd4 = [ [1, 2, 3, 4, 5, 6, 7, 8, b],
            [b, b, b, b, b, b, b, b, 2],
            [b, b, b, b, b, b, b, b, 3],
            [b, b, b, b, b, b, b, b, 4],
            [b, b, b, b, b, b, b, b, 5],
            [b, b, b, b, b, b, b, b, 6],
            [b, b, b, b, b, b, b, b, 7],
            [b, b, b, b, b, b, b, b, 8],
            [b, b, b, b, b, b, b, b, 9]]




// FUNCTION DEFINITIONS
//

const initiate = () => {
    // populate the board with whatever the user inputted
    let startingBoard = [[]]
    let j = 0
    for (let i = 1; i <= 81; i++){
        const val = document.getElementById(String(i)).value
        if (val == ""){
            startingBoard[j].push(null)
        }
        else { 
            startingBoard[j].push(Number(val))
        }
        if (i % 9 == 0 && i < 81){
            startingBoard.push([])
            j++
        }
    }
    // console.log(startingBoard)
    const inputValid = validBoard(startingBoard)
    if (!inputValid){
        inputIsInvalid()
    }
    else{
        const answer = solve(startingBoard)
        updateBoard(answer, inputValid)
    }
}

const solve = board => {
    // if board is solved, return board
    // otherwise generate all possibilities
    // get rid of all the invalid boards
    // call helper function and use backtracking search 
    if (solved(board)) {
        return board
    }
    else {
        const possibilities = nextBoards(board)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }
}

// TESTS______ //
// console.log(solve(bd4))
// TESTS______ //


const searchForSolution = boards => {
    
    // finds valid solution to the sudoku problem
    if (boards.length < 1){
        return false
    }
    else {
         // backtracking search for solution
        // mutual recursion checking solution one by one
        // spawning all the possibilities for that board
        // up until we hit a dead and with no more possibilities
        // or we filled up all the squares for that board thus solving board
        let first = boards.shift()
         // remove the first board to check if we can solve the board first
        const tryPath = solve(first)
        if (tryPath != false){
            // if not false, we hit the solve function so we return true
            return tryPath
        }
        else{
            // else we want to shift horizontally to the next tree(board)
            // to check if we can solve any other boards given
            return searchForSolution(boards)
        }
    }
}


const solved = board => {
    // if a board is solved, every single square is not empty or filled with a number
    // nest a for loop to check if any square is null
    // if null return false
    // else return true
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

// TESTS______ //
// console.log(solved(bd3))
// TESTS______ //


const nextBoards = board => {
    // store all possible sudoku boards in array
    let res = []
    // should return (y, x) coordinates
    const firstEmpty = findEmptySquare(board)
    // if we return something that is something that is undefined that means
    // there are no possibilities left so we return res
    if (firstEmpty != undefined){
        // if not undefined, we are given a tuple of coordinates
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        // fill out all the  numbers from 1 - 9 for that empty board
        for (let i = 1; i <= 9; i++){
            // create a new board
            // instead of all boards pointing to one board
            var newBoard = [...board]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

const findEmptySquare = board =>{
    // THIS FUNCTION WORKS.
    // Board -> [Int, Int] 
    // (get the i j coordinates for the first empty square)
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}

// TESTS______ //
// console.log(nextBoards(bd3))
// console.log(findEmptySquare(bd3))
// TESTS______ //

const keepOnlyValid = boards =>{
    // return a filtered version of our board's array
    // pass in a method that checks over each and every single board
    // if the valid board method returns true, it will be kept
    // else it will be dropped
    var res = []
    for (var i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}

// TESTS______ //
// console.log(keepOnlyValid([bd1, bd2, bd3]))
// TESTS______ //


const validBoard = board =>{
    // check if each row does not include any duplicate numbers
    // check if each column does not include any duplicate numbers
    // check if each box does not include any duplicate numbers
    return rowsGood(board) && columnsGood(board) && boxesGood(board)
}

const rowsGood = board => {
     // traverse horizontally to check for duplicates
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                cur.push(board[i][j])
            }
        }
    }
    return true
}

const columnsGood  = board =>{
     // traverse vertically to check for duplicates
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true
}


const boxesGood = board => {
    // build the coordinates for a box
    // transform this everywhere to update res
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]
    // shift left or right 3 boxes 
    // shift up or down 3 boxes
    // traverse vertically and horizontally
    // makes sure there are no repeating numbers for each box
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            // check if grid contains a duplicate
            // each traversal should examine each box
            var cur = []
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}

// ______TESTS______ //
// console.log("Rows:")
// console.log(rowsGood(bd1))
// console.log(rowsGood(bd2))
// console.log(rowsGood(bd3))
// console.log("Columns:")
// console.log(columnsGood(bd1))
// console.log(columnsGood(bd2))
// console.log(columnsGood(bd3))
// console.log("Boxes:")
// console.log(boxesGood(bd1))
// console.log(boxesGood(bd2))
// console.log(boxesGood(bd3))
// console.log("Valid?")
// console.log(validBoard(bd1))
// console.log(validBoard(bd2))
// console.log(validBoard(bd3))
// ______TESTS______ //


const updateBoard = board => {
    // Board -> null
    // update the DOM with the answer
    if (board == false){
        for (i = 1; i <= 9; i++){
            document.getElementById("row " + String(i)).innerHTML = "NO SOLUTION EXISTS TO THE GIVEN BOARD"
        }
    }
    else{
        for (var i = 1; i <= 9; i++){
            var row = ""
            for (var j = 0; j < 9; j++){
                if (row == ""){
                    row = row + String(board[i - 1][j])
                }
                else {
                    row = row + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + String(board[i - 1][j])
                }
            }
            document.getElementById("row " + String(i)).innerHTML = row
        }
    }
}

function inputIsInvalid(){
    // starting board is invalid or puzzle is insolvable
    // Inner html invalid board string
    for (i = 1; i <= 9; i++){
        document.getElementById("row " + String(i)).innerHTML = "THE GIVEN BOARD IS INVALID"
    }
}
