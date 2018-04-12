let moves = 0;
const deck = document.querySelector(".deck");
const movesElement = document.querySelector('.moves');
const resetElement = document.querySelector(".restart")

resetElement.addEventListener('click', reset);

function checkForWinner() {
  let all = deck.querySelectorAll('li');
  let allMatching = deck.querySelectorAll('li.match');
  if(all.length === allMatching.length) {
    alert("You Win!");
  }
}

function resetMoves() {
  moves = 0;
  movesElement.textContent = moves;
}

function incrementMoves() {
  moves++;
  movesElement.textContent = moves;
}

function reset() {
  cards = deck.querySelectorAll('li');
  for(let x=0; x < cards.length; x++) {
    cards[x].className = "card"
  }
  resetMoves();
}

function checkMatch(element1, element2) {
  setTimeout(function(){
    // If the inner HTML is the same, the cards match! Yay!
    if(element1.innerHTML == element2.innerHTML && element1 !== element2) {
      element2.classList.remove("open", "show");
      element1.classList.remove("open", "show");
      element2.classList.add("match")
      element1.classList.add("match");
      checkForWinner();
    } else {
      element2.classList.remove("open", "show");
      element1.classList.remove("open", "show");
    }
  }, 1000)
}


deck.addEventListener('click', function(event){
  let classlist = event.target.classList;
  if(event.target.tagName == "LI" && !classlist.contains('open') && !classlist.contains('match')) {
    // Check for a previously selected card
    previouslySelected = deck.querySelector('.open.show');
    
    // If there is one that is open and shown
    // then this is the second selector
    if(previouslySelected) {
      event.target.classList.add('open', 'show');
      checkMatch(previouslySelected, event.target)
      incrementMoves();
    } else { //otherwise, there is no previously selected card, so just show this one.
      event.target.classList.add('open', 'show');
    }

  }
})