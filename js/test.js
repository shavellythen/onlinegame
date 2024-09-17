let currentContainerIndex = 0;  // Active container
const containers = document.querySelectorAll('.container');
const result = document.getElementById('result');
const scoreGif = document.getElementById('score-gif');  // GIF
const meowSound = document.getElementById('meow-sound'); // Correct sound
const meowAngry = document.getElementById('meow-angry'); // Incorrect sound
let score = 0;  // Initialize score

function moveToNextContainer() {
    console.log('moving to the next…')

    result.textContent = ""

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
        card.classList.remove('selected');
        card.classList.remove('shake');  // Remove shake class
        card.classList.remove('jump');   // Remove jump class
        card.classList.remove('mouse-effect'); // Remove mouse-effect class
        card.classList.remove('cat-click'); // Remove cat-click class
    });
}

// Function to mark unclicked cards
function markUnclickedCards(container, clickedCard) {
    container.querySelectorAll('.card').forEach(card => {
        if (card !== clickedCard) { // Exclude the clicked card
            setTimeout(() => {
                card.classList.remove('selected'); // Remove 'selected' class after delay
            }, 1000); // Delay time in milliseconds
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
                    
                    // Play the happy meow sound
                    meowSound.play();

                    // Add jump animation to the correct card
                    card.classList.add('jump');
                    
                    // Remove the jump class after animation completes to allow re-animation
                    setTimeout(() => {
                        card.classList.remove('jump');
                    }, 500); // Duration of the jump animation
                    
                    setTimeout(moveToNextContainer, 1000); // Delay for moving to next container
                } else {
                    result.textContent = "Try again!";
                    result.style.color = 'rgb(255 34 112)';
                    
                    // Play the angry meow sound
                    meowAngry.play();
                    
                    // Add shake animation to the incorrect card
                    card.classList.add('shake');
                }

                card.classList.add('selected');  // Mark the clicked card visually as selected
            }
        });
    });
});

// Show the first container
containers[0].classList.add('active');
