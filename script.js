const cards = document.querySelectorAll(".card");
const showVerb = document.getElementById("showVerb");


let matched = 0;
let first, second;
let disabled = false;

function cardFlipped({ target: cardSelected }) {
    if (first !== cardSelected && !disabled) {
        cardSelected.classList.add("flip");
        if (!first) {
            return first = cardSelected;
        }
        second = cardSelected;
        disabled = true;
        let firstImg = first.querySelector(".trasera img").src,
            secondImg = second.querySelector(".trasera img").src;
        cardsMatched(firstImg, secondImg);
    }
}



function cardsMatched(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched == 8) {
            setTimeout(() => {
                return cardRandom();
            }, 1000);
        }
        first.removeEventListener("click", cardFlipped);
        second.removeEventListener("click", cardFlipped);
        first = second = "";
        return disabled = false;
    }

    setTimeout(() => {
        first.classList.remove("flip");
        second.classList.remove("flip");
        first = second = "";
        disabled = false;
    }, 1200);
}

function cardRandom() {
    matched = 0;
    disabled = false;
    first = second = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".trasera img");
        imgTag.src = `imagenes/juego-${arr[i]}.png`;
        card.addEventListener("click", cardFlipped);
    });
}

cardRandom();

cards.forEach(card => {
    card.addEventListener("click", cardFlipped);
});