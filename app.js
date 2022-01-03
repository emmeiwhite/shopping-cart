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

// buttons
let buttonsDOM = [];

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
              <i class="fas fa-shopping-cart"></i>
              add to bag
            </button>
          </div>

          <h3>${title}</h3>
          <h4>$ ${price}</h4>
        </article>`;
    });

    productsDOM.innerHTML = result;
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")]; // NodeList to Array
    buttonsDOM = buttons; // I didn't get this yet
    buttons.forEach((btn) => {
      let id = btn.dataset.id;
      // localStorage check on cart array, since cart will be stored in localStorage
      let inCart = cart.find((item) => item.id === id);

      if (inCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }

      btn.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;

        // get product from localStorage products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        // add product to the cart
        cart = [...cart, cartItem];

        // save cart in local Storage
        Storage.saveCart(cart);

        // set cart Values
        this.setCartValues(cart);

        // display cart item
        this.setCartItem(cartItem);

        // show the cart
        this.showCart();
      });
    });
  }

  setCartValues(cart) {
    let itemsTotal = 0;
    let tempTotal = 0;

    cart.map((item) => {
      itemsTotal += item.amount * item.price;
      tempTotal += item.amount;
    });
    cartItems.innerText = tempTotal;
    cartTotal.innerText = parseFloat(itemsTotal.toFixed(2));
  }

  setCartItem(item) {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML += `
            <img src=${item.image} alt="product" />

            <div>
              <h4>${item.title}</h4>
              <h5>$ ${item.price}</h5>
              <span class="remove-item" data-id=${item.id}>remove</span>
            </div>

            <div>
              <i class="fas fa-chevron-up" data-id=${item.id}></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
          `;

    cartContent.appendChild(div);
    console.log(cartContent);
  }

  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      // to make sure first all the products are available
      ui.getBagButtons();
    });
});
