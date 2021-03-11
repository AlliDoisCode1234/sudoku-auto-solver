// 
const b = null

// Possible Boards to Solve

const bd1 = [
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b]
]

const bd2 = [
    [3, b, b, 4, b, b, b, b, 1],
    [b, b, b, b, 7, b, b, b, b],
    [7, b, b, b, b, b, b, b, b],
    [b, b, 2, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, 9, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, 1, b, b, b],
    [b, 7, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, 4]
]

// Impossible to Solve

const bd3 = [
    [1, b, b, b, b, b, b, b, b],
    [2, b, b, b, b, b, b, b, b],
    [3, b, b, b, b, b, b, b, b],
    [4, b, b, b, b, b, b, b, b],
    [5, b, b, b, b, b, b, b, b],
    [6, b, b, b, b, b, b, b, b],
    [7, b, b, b, b, b, b, b, b],
    [8, b, b, b, b, b, b, b, b],
    [b, 2, 3, 4, 5, 6, 7, 8, 9]
]

// Impossible to solve

const bd4 = [
    [1, b, b, b, b, b, b, b, b],
    [2, b, b, b, b, b, b, b, b],
    [3, b, b, b, b, b, b, b, b],
    [4, b, b, b, b, b, b, b, b],
    [5, b, b, b, b, b, b, b, b],
    [6, b, b, b, b, b, b, b, b],
    [7, b, b, b, b, b, b, b, b],
    [8, b, b, b, b, b, b, b, b],
    [b, 9, 8, 7, 6, 5, 4, 3, 2]
]

// if board is solved, return board
// otherwise generate all possibilities
// get rid of all the invalid boards
// call helper function and use backtracking search algo

const solve = board => {
    if(solved(board)){
        return board
    } else {
        const possibilities = nextBoards(boards)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }
}

const searchForSolution = boards => {
    if(boards.length < 1){
        return false    
    } else {
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
        } else{
            // else we want to shift horizontally to the next tree(board)
            // to check if we can solve any other boards given
            return searchForSolution(boards)
        }
    }
}



// if a board is solved, every single square is not empty or filled with a number
// nest a for loop to check if any square is null
// if null return false
// else return true
const solved = board => {
    for(let i =0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] === null){
                return false
            } 
        }
    }
    return true
}

const nextBoards = board => {
    // store all possible sudoku boards in array
    let res = []
    const firstEmpty = findEmptySquare(board) // should return (y, x) coordinates
    
    // if we return something that is something that is undefined that means
    // there are no possiblities left so we return res
    
    if(firstEmpty != undefined){
        // if not undefined, we are given a tuple of coordinates
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        // fill out all the  numbers from 1 - 9 for that empty board
        for(let i = 1; i <= 9; i++){
            // create a new board
            // instead of all boards pointing to one board
            let newBoard = [...board]
            let row = [...newBoard[y]]
            row[x] = newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}


const firstEmptySquare = board =>{
    // given a board, return a tuple that represents the coordinates
    // for the first empty square

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] == null){
                return [i, j]
            }
        }
    }
}