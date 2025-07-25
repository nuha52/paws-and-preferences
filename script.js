const cardContainer = document.getElementById("card-container");
const summaryContainer = document.getElementById("summary");

const totalCats = 10; // Change this to more if you want
let currentIndex = 0;
let cats = [];
let likedCats = [];

async function loadCats() {
  for (let i = 0; i < totalCats; i++) {
    const url = `https://cataas.com/cat?${Math.random()}`;
    cats.push(url);
  }
  showCat();
}

function showCat() {
  cardContainer.innerHTML = "";

  if (currentIndex < cats.length) {
    const card = document.createElement("div");
    card.className = "cat-card";

    const img = document.createElement("img");
    img.src = cats[currentIndex];
    img.alt = "Cat";

    card.appendChild(img);
    cardContainer.appendChild(card);

    // ✅ Swipe support using Hammer.js
    const hammertime = new Hammer(card);
    hammertime.on("swipeleft", () => {
      console.log("Swiped left 👎");
      dislikeCat();
    });

    hammertime.on("swiperight", () => {
      console.log("Swiped right 👍");
      likeCat();
    });
  } else {
    showSummary();
  }
}

function likeCat() {
  likedCats.push(cats[currentIndex]);
  console.log("Liked cats:", likedCats);
  currentIndex++;
  showCat();
}

function dislikeCat() {
  currentIndex++;
  showCat();
}

function showSummary() {
  document.getElementById("buttons").style.display = "none";
  summaryContainer.style.display = "block";

  const heading = document.createElement("h2");
  heading.textContent = `You liked ${likedCats.length} cats! 😻`;
  summaryContainer.appendChild(heading);

  likedCats.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.className = "summary-img";
    summaryContainer.appendChild(img);
  });
}

loadCats();
