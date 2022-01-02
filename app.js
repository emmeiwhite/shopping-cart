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
      const result = await fetch("./produts.json");
      console.log(result);
      if (result.status >= 200 && result.status <= 399) {
        const data = await result.json();
        return data; // Async fxn always returns a promise
      } else {
        throw new Error("Data could't be found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// display products
class UI {}

// local storage
class Storage {}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent has Loaded");
  const ui = new UI();
  const products = new Products();

  products.getProducts().then((data) => console.log(data));
});
