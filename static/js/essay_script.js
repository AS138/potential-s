const topicText = document.querySelector(".topic p");
const typingText = document.querySelector(".typing-text p");
let typing = document.querySelector(".wrapper");
let inpField = document.querySelector(".wrapper .input-field");
let correctTag = document.querySelector(".correct-types span");
let mistakeTag = document.querySelector(".miss-types span");
let accuracyTag = document.querySelector(".accuracy span");
let tryAgainBtn = document.querySelector("button");
let modal = document.querySelector(".modal-wrapper");
let modalScore = document.querySelector(".typing-score span");
let modalCorrect = document.querySelector(".modal-ct span");
let modalMiss = document.querySelector(".modal-mt span");
let modalAccuracy = document.querySelector(".modal-accuracy span");
let againBtn = document.querySelector(".againBtn");
let homeBtn = document.querySelector(".homeBtn");

let charIndex = correctTypes = mistakes = 0;

function randomParagraph() {
    // getting random number and it'll always less than the sample length
    let randIndex = Math.floor(Math.random() * sample.length);

    // insert topic above the typing text
    topicText.innerHTML = topic[randIndex];

    typingText.innerHTML = "";

    // getting random item from the sample array, splitting all characters of it,
    // adding each character inside span and the adding this span inside p tag.
    sample[randIndex].split("").forEach((char) => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    
    // focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}


function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    // if user hasn't entered any character or pressed backspace
    if(typedChar == null)
    {
        charIndex--; // decrement charIndex
        characters[charIndex].classList.remove("correct", "incorrect");
    }
    else
    {
        if(characters[charIndex].innerHTML === typedChar)
        {
            // if user typed character and shown character matched, increment the correctTypes and add the correct class 
            correctTypes++;
            characters[charIndex].classList.add("correct");

            if(charIndex + 1 === characters.length)
            {
                // Disable the typing screen and display the modal screen
                typing.style.display = 'none';
                modal.style.display = 'inline';
                // Reflect details of typing results in the modal
                modalScore.innerHTML = ((correctTypes - mistakes) * (correctTypes / (correctTypes + mistakes)).toFixed(2)).toFixed(0);
                modalCorrect.innerHTML = correctTypes;
                modalMiss.innerHTML = mistakes;
                modalAccuracy.innerHTML = (correctTypes / (correctTypes + mistakes) * 100).toFixed(1);
            }
        }
        else 
        {
            // if user typed character and shown character unmatched, increment the mistakes and add the incorrect class
            mistakes++;
            characters[charIndex].classList.add("incorrect");
        }
        charIndex++; // increment charIndex either user typed correct or incorrect character
    }
    
    characters.forEach((char) => char.classList.remove("active"));
    characters[charIndex].classList.add("active");

    const accuracy = (correctTypes / (correctTypes + mistakes) * 100).toFixed(1);

    correctTag.innerHTML = correctTypes;
    mistakeTag.innerHTML = mistakes;
    accuracyTag.innerHTML = accuracy;
}


function resetTyping() {
    // calling randomParagraph function and reseting each variables and elements value to default
    randomParagraph();
    inpField.value = "";
    charIndex = correctTypes = mistakes = 0;
    correctTag.innerHTML = 0;
    mistakeTag.innerHTML = 0;
    accuracyTag.innerHTML = "";
}


function againTyping() {
    // calling randomParagraph function and reseting each variables and elements value to default
    randomParagraph();
    inpField.value = "";
    charIndex = correctTypes = mistakes = 0;
    correctTag.innerHTML = 0;
    mistakeTag.innerHTML = 0;
    accuracyTag.innerHTML = "";
    // Disable the modal screen and display the typing screen
    typing.style.display = 'inline';
    modal.style.display = 'none';
}


function moveHome() {
    window.location.href = '/practice';
}


randomParagraph();

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetTyping);
// Button events for Modal
homeBtn.addEventListener("click", moveHome);
againBtn.addEventListener("click", againTyping);