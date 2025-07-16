const pageButtons = document.querySelectorAll(".page-btn");
const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

console.log(nextBtn);
console.log(prevBtn);
const cards = document.querySelectorAll(".card");

const numOfItems = 4;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  showContent(currentPage);
  setupPagination();
});

// Highlight and handle clicks for numbered buttons
function setupPagination() {
  pageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = parseInt(button.getAttribute("data-index"));
      updateActiveButton(currentPage);
      showContent(currentPage);
    });
  });

  // Optional: Next/Prev controls
  nextBtn?.addEventListener("click", () => {
    const totalPages = Math.ceil(cards.length / numOfItems);
    if (currentPage < totalPages) {
      currentPage++;
      updateActiveButton(currentPage);
      showContent(currentPage);
    }
  });

  prevBtn?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateActiveButton(currentPage);
      showContent(currentPage);
    }
  });
}

function showContent(page) {
  const startIndex = (page - 1) * numOfItems;
  const endIndex = startIndex + numOfItems;

  cards.forEach((card, index) => {
    card.style.display =
      index >= startIndex && index < endIndex ? "block" : "none";
  });
}

function updateActiveButton(page) {
  pageButtons.forEach((btn) => {
    const index = parseInt(btn.getAttribute("data-index"));
    btn.classList.toggle("active", index === page);
  });
}
