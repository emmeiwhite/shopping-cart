// variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartDOM = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// cart

let cart = []; // Manipuate data from LocalStorage and back

// getting the products
class Products {
  async getProducts() {
    try {
      const result = await fetch("./products.json");
      if (result.status >= 200 && result.status <= 399) {
        const data = await result.json();

        let products = data.items.map((item) => {
          const { id } = item.sys;
          const { title, price } = item.fields;
          const image = item.fields.image.fields.file.url;

          return { id, title, image, price };
        });

        return products;
      } else {
        throw new Error("Data could't be found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// display products
class UI {
  displayProducts(products) {
    let result = "";
    console.log(products);
    products.forEach(({ image, id, price, title }) => {
      result += `
        <!-- Single Product -->
        <article class="product">
          <div class="img-container">
            <img
              src=${image}
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id=${id}>
              <i class="fas fa-shopping-cart"> add to bag </i>
            </button>
          </div>

          <h3>${title}</h3>
          <h4>$ ${price}</h4>
        </article>`;
    });

    productsDOM.innerHTML = result;
  }
}

// local storage
class Storage {}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent has Loaded");
  const ui = new UI();
  const products = new Products();

  products.getProducts().then((products) => ui.displayProducts(products));
});
