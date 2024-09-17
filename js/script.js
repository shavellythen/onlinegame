let currentContainerIndex = 0;  // Active container
const containers = document.querySelectorAll('.container');
const result = document.getElementById('result');
const scoreGif = document.getElementById('score-gif');  // GIF
let score = 0;  // Initialize score

function moveToNextContainer() {
    console.log('moving to the next…')

    //
    result.textContent = "";

    // Hide the current container
    containers[currentContainerIndex].classList.remove('active');

    // Next container
    currentContainerIndex++; // Add one to index

    // Final container
    if (currentContainerIndex < containers.length) {
        containers[currentContainerIndex].classList.add('active');
        
        // Reset the card states in the new container
        resetCardStates(containers[currentContainerIndex]);
    } else {
        result.textContent = `Score: ${score}`;  // Display final score
        scoreGif.style.display = 'block';  // Reveal GIF
    }
}

// Function to reset card states
function resetCardStates(container) {
    container.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected', 'unclicked');
    });
}

// Function to mark unclicked cards as gray
function markUnclickedCards(container, clickedCard) {
    container.querySelectorAll('.card').forEach(card => {
        if (card !== clickedCard) { // Exclude the clicked card
            card.classList.add('unclicked');
            card.classList.remove('selected');
        }
    });
}

// Listens to event on all of the cards
containers.forEach(container => {
    container.querySelectorAll('.card').forEach(card => {
        // Add a flag to track if the card has been clicked before
        let cardClicked = false;

        card.addEventListener('click', function () {
            if (!cardClicked) {  // Only proceed if the card hasn't been clicked before
                cardClicked = true;  // Mark the card as clicked

                // Reset the state of other cards
                markUnclickedCards(container, card);

                if (card.classList.contains('correct')) {
                    result.textContent = "Correct! Well done!";
                    result.style.color = '#c6dd58';
                    score++;  // Increment the score for correct clicks
                    setTimeout(moveToNextContainer, 1000);
                } else {
                    result.textContent = "Try again!";
                    result.style.color = '#ff1574';
                }

                card.classList.add('selected');  // Mark the clicked card visually as selected
            }
        });
    });
});

// Show the first container
containers[0].classList.add('active');
