let product = [...products];

const productContainer = document.querySelector(".products-container");
const searchInput = document.querySelector(".search-input");
const companySection = document.querySelector(".companies");

let searchTerm = ""; // نگهداری مقدار جستجو
let companyFilter = "all"; // نگهداری مقدار فیلتر شرکت

function displayProducts(products) {
  const result = products
    .map((item) => {
      return `<article class="product">
              <img src="${item.image}" alt="img" class="product-img img">
              <div>
                  <h5 class="product-name">${item.title}</h5>
                  <span class="product-price">${item.price}</span>
              </div>
            </article>`;
    })
    .join("");
  
  productContainer.innerHTML = result;
}

displayProducts(product);

// تابع مشترک برای فیلتر و نمایش محصولات
function filterAndDisplayProducts() {
  let filteredProducts = product
    .filter((item) => {
      // شرط فیلتر شرکت
      const matchesCompany = companyFilter === "all" || companyFilter === item.company;
      // شرط جستجوی متنی فقط روی محصولات کمپانی انتخاب شده اعمال می‌شود
      const matchesSearch = item.title.toLowerCase().startsWith(searchTerm);
      
      return matchesCompany && matchesSearch; // ترکیب هر دو شرط
    });
  
  displayProducts(filteredProducts);
}

// جستجو بر اساس ورودی کاربر
searchInput.addEventListener("keyup", (e) => {
  searchTerm = e.target.value.toLowerCase(); // به‌روزرسانی مقدار جستجو
  filterAndDisplayProducts(); // اعمال جستجوی ترکیبی
});

// ایجاد دکمه‌های شرکت‌ها
const displayButtons = () => {
  const buttons = ["all", ...new Set(product.map((item) => item.company))];
  
  companySection.innerHTML = buttons
    .map((item) => {
      return `<button class="company-btn" data-id="${item}">${item}</button>`;
    })
    .join("");
};

displayButtons();

// فیلتر بر اساس شرکت
companySection.addEventListener("click", (e) => {
  const targetValue = e.target.dataset.id;
  if (targetValue) { // مطمئن شویم روی دکمه کلیک شده
    companyFilter = targetValue; // به‌روزرسانی مقدار فیلتر شرکت
    filterAndDisplayProducts(); // اعمال جستجوی ترکیبی
  }
});
