
function createGameBoard(rows, cols) {
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';

    for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const td = document.createElement('td');
            td.style.width = '30px';
            td.style.height = '30px';
            td.style.border = '1px solid black';
            td.style.textAlign = 'center';
            td.style.verticalAlign = 'middle';
            if (i == 0 || j == 0 || i == rows - 1 || j == cols - 1) {
                if (i == 5 || i == 6 || j == 5 || j == 6) {
                    td.classList.add('cell')
                }
                else {
                    td.classList.add('borderCell')
                }
            }
            else {

                td.classList.add('cell')
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table;
}

const gameBoard = createGameBoard(12, 12);
document.getElementById('gameBoard').appendChild(gameBoard);

let playerRow;
let playerCol;
let playerPlace;
let cntBall = 2;
let cntCatchBall = 0;

function randPlace() {
    let row = Math.floor(Math.random() * (10)) + 1;
    let col = Math.floor(Math.random() * (10)) + 1;
    return { row, col }
}


function baginPlay() {
    let { row, col } = randPlace();
    playerRow = row;
    playerCol = col;
    playerPlace = document.querySelector(`table tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
    playerPlace.innerText = "😊"

    let firstBall, secondBall;
    do {
        ({ row, col } = randPlace());
        firstBall = document.querySelector(`table tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
    } while (firstBall.textContent.trim() !== "");
    firstBall.innerText = "⚽"

    do {
        ({ row, col } = randPlace());
        secondBall = document.querySelector(`table tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
    } while (secondBall.textContent.trim() !== "");
    secondBall.innerText = "⚽"
    console.log(secondBall);


    document.addEventListener('keydown', (event) => {
        let newRow = playerRow;
        let newCol = playerCol;

        switch (event.key) {
            case 'ArrowUp':
                console.log(playerRow);
                console.log(playerCol);
                if (playerRow === 0) {
                    // אם בשורה 0, לא מאפשר עלייה אלא אם כן בעמודות 5 או 6
                    if (playerCol === 5 || playerCol === 6) {
                        newRow = 11; // עובר לשורה 11
                    } else {
                        return; // לא מאפשר עלייה
                    }
                } else {
                    newRow--; // עלייה
                }
                break;

            case 'ArrowDown':
                if (playerRow === 11) {
                    // אם בשורה 11, לא מאפשר ירידה אלא אם כן בעמודות 5 או 6
                    if (playerCol === 5 || playerCol === 6) {
                        newRow = 0; // עובר לשורה 0
                    } else {
                        return; // לא מאפשר ירידה
                    }
                } else {
                    newRow++; // ירידה
                }
                break;

            case 'ArrowLeft':
                if (playerCol === 0) {
                    // אם בעמודה 0, לא מאפשר לעבור לשם אלא אם כן בשורות 5 או 6
                    if (playerRow === 5 || playerRow === 6) {
                        newCol = 11; // עובר לעמודה 11
                    } else {
                        return; // לא מאפשר מעבר
                    }
                } else {
                    newCol--; // שמאלה
                }
                break;
            case 'ArrowRight':
                if (playerCol === 11) {
                    // אם בעמודה 11, לא מאפשר לעבור לשם אלא אם כן בשורות 5 או 6
                    if (playerRow === 5 || playerRow === 6) {
                        newCol = 0; // עובר לעמודה 0
                    } else {
                        return; // לא מאפשר מעבר
                    }
                } else {
                    newCol++; // ימינה
                }
                break;

            default:
                return;
        }
        //     case 'ArrowUp':
        //         if ((newRow === 0) && (newCol !== 5 && newCol !== 6)) {
        //             return; 
        //         }
        //         if ((playerRow === 0) && (playerCol === 5 || playerCol === 6)) {
        //             newRow = 11; 
        //         } else if (playerRow > 0) {
        //             newRow--; // עלייה
        //         }
        //         break;
        //     case 'ArrowDown':
        //         if ((newRow === 11) && (newCol !== 5 && newCol !== 6)) {
        //             return; 
        //         }
        //         if ((playerRow === 11) && (playerCol === 5 || playerCol === 6)) {
        //             newRow = 0; 
        //         } else if (playerRow < 11) {
        //             newRow++; // ירידה
        //         }
        //         break;
        //     case 'ArrowLeft':
        //         if (newCol === 0) {
        //             if (playerRow === 5 || playerRow === 6) {
        //                 newCol = 11; 
        //             } else {
        //                 return; 
        //             }
        //         } else if (newCol > 0) {
        //             newCol--; // שמאלה
        //         }
        //         break;
        //     case 'ArrowRight':
        //         if (newCol === 11) {
        //             if (playerRow === 5 || playerRow === 6) {
        //                 newCol = 0; 
        //             } else {
        //                 return; 
        //             }
        //         } else if (newCol < 11) {
        //             newCol++; // ימינה
        //         }
        //         break;
        // }

        if (newRow != playerRow || newCol != playerCol) {
            if (document.querySelector(`table tr:nth-child(${newRow + 1}) td:nth-child(${newCol + 1})`).innerText == "⚽") {
                cntCatchBall++;
            }


            playerPlace.innerText = " ";
            playerRow = newRow;
            playerCol = newCol;
            playerPlace = document.querySelector(`table tr:nth-child(${playerRow + 1}) td:nth-child(${playerCol + 1})`);
            playerPlace.innerText = "😊";

            if (cntBall === cntCatchBall) {
                let intervalId = setInterval(() => { alert("ניצחון"), clearInterval(intervalId); }, 500)

            }

        }
    });
}



function addBall() {
    let ball;
    do {
        let { row, col } = randPlace();
        ball = document.querySelector(`table tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
    } while (ball.textContent.trim() !== "");
    ball.innerText = "⚽"
    cntBall++
}


baginPlay()
setInterval(addBall, 3000);


