const selectionButtons = document.querySelectorAll('[data-selection]') //Be able to click on each emoji
const finalColumn = document.querySelector('[data-final-column]') //images will show at the top when playing
const computerScoreSpan = document.querySelector('[data-computer-score]') //Computer score
const yourScoreSpan = document.querySelector('[data-your-score]') //Update the score of the game
const SELECTIONS = [ 
  {
      //rock beats scissors
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
      //paper beats rock
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
      //scissors beat paper
    name: 'scissors',
    emoji: '✌',
    beats: 'paper'
  }
]
// To be able to click on each emoji
selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
})
//Winner is depending on which ever selections is being clicked on
function makeSelection(selection) {
  const computerSelection = randomSelection()
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  addSelectionResult(computerSelection, computerWinner)
  addSelectionResult(selection, yourWinner)

  if (yourWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan)


}
//Increase score of which ever winner
function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}
//Showing the result using the emoji
function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.emoji
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)


}
// Winner is the best selection
function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name


}
// Random selection for the computer
function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]


}



