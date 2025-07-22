const paginationContainer = document.querySelector(".pagination");
const cards = document.querySelectorAll(".card");
const numOfItems = 4;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  showContent(currentPage);
  renderPagination();
});

function showContent(page) {
  const startIndex = (page - 1) * numOfItems;
  const endIndex = startIndex + numOfItems;

  cards.forEach((card, index) => {
    card.style.display =
      index >= startIndex && index < endIndex ? "block" : "none";
  });
}

function renderPagination() {
  const totalPages = Math.ceil(cards.length / numOfItems);
  paginationContainer.innerHTML = "";

  const createButton = (page) => {
    const btn = document.createElement("button");
    btn.className = "page-btn";
    btn.textContent = page;
    btn.setAttribute("data-index", page);
    if (page === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = page;
      showContent(currentPage);
      renderPagination();
    });

    return btn;
  };

  const addDots = () => {
    const dots = document.createElement("button");
    dots.className = "dots";
    dots.textContent = "...";
    dots.disabled = true;
    paginationContainer.appendChild(dots);
  };

  // Prev Button
  const prevBtn = document.createElement("button");
  prevBtn.className = "prev";
  prevBtn.textContent = "Prev";
  if (currentPage === 1) {
    prevBtn.style.color = "gray";
  }
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showContent(currentPage);
      renderPagination();
      console.log(currentPage, totalPages, currentPage === totalPages);
    }
  });
  paginationContainer.appendChild(prevBtn);

  const pages = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage <= 3) {
      pages.push(2, 3, 4);
      pages.push("dots");
    } else if (currentPage >= totalPages - 2) {
      pages.push("dots");
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      pages.push("dots");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("dots");
    }

    pages.push(totalPages);
  }

  pages.forEach((p) => {
    if (p === "dots") {
      addDots();
    } else {
      paginationContainer.appendChild(createButton(p));
    }
  });

  // Next Button
  const nextBtn = document.createElement("button");
  nextBtn.className = "next";
  nextBtn.textContent = "Next";
  if (currentPage === totalPages) {
    nextBtn.style.color = "gray";
  }
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      showContent(currentPage);
      renderPagination();
      console.log(currentPage, totalPages, currentPage === totalPages);
    }
  });
  paginationContainer.appendChild(nextBtn);
}
