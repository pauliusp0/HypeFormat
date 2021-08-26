// IMPORTS

import endpoints from './modules/endpoints.js';

// VARIABLES
const productContainer = document.querySelector('#product-container');
const categoryName = document.querySelector('#category-name');
const categoryNameHome = document.querySelector('#category-name-home');
const itemCounter = document.querySelector('#item-counter');

// logic
let category;

// FUNCTIONS

// show products
const showData = (productsArray) => {
  productContainer.innerHTML = productsArray.reduce((total, product) => {
    total += `
  <div class="card" id="card">
    <div id="cardImg">

             <img data-id=${product._id} src="${product.image}">

            
             </div>
             <p>${product.category}</p>
             <h4>${product.name}</h4>
            <span><i class="far fa-star"></i></span>
                   <span><i class="far fa-star"></i></span>
                          <span><i class="far fa-star"></i></span>
                                 <span><i class="far fa-star"></i></span>
                                        <span><i class="far fa-star"></i></span>
                                        <h5>${product.price}</h5>

             </div>
      `;

    //  Show how many items

    itemCounter.innerText = `Showing all ${productsArray.length} results`;
    category = category.substr(0, 1).toUpperCase() + category.slice(1, 20);

    // Show category
    if (category === '') {
      categoryName.innerText = 'All products';
      categoryNameHome.innerText = `Home / All`;
    } else {
      categoryName.innerText = category;
      categoryNameHome.innerText = `Home / ${category}`;
    }
    return total;
  }, '');

  const card = document.querySelectorAll('#cardImg');
  card.forEach((item) =>
    item.addEventListener('click', (e) => {
      window.location.href =
        '/frontend/pages/product.html#' + e.target.dataset.id;
    })
  );

  // Product effects on mouse enter
  document.querySelectorAll('#cardImg').forEach((card) => {
    card.addEventListener('mouseenter', (e) => {
      let div = document.createElement('div');
      let h4 = document.createElement('h4');
      h4.innerText = 'Quick View';
      div.appendChild(h4);
      div.classList.add('img-additional');
      e.target.appendChild(div);
    });
    card.addEventListener('mouseleave', (e) => {
      const img = document.querySelector('.img-additional');
      img.remove();
    });
  });
};

// Get category and mark clicked button by location href
const getCategory = () => {
  if (location.href.includes('all')) {
    category = '';
    document.querySelector('#shopall').classList.add('clicked');
  } else if (location.href.includes('canvases')) {
    category = 'canvases';
    document.querySelector('#canvases').classList.add('clicked');
  } else if (location.href.includes('posters')) {
    category = 'posters';
    document.querySelector('#posters').classList.add('clicked');
  } else if (location.href.includes('stickers')) {
    category = 'stickers';
    document.querySelector('#stickers').classList.add('clicked');
  } else if (location.href.includes('cups')) {
    category = 'cups';
    document.querySelector('#posters').classList.add('clicked');
  } else if (location.href.includes('calendars')) {
    category = 'calendars';
    document.querySelector('#posters').classList.add('clicked');
  } else if (location.href.includes('apparel')) {
    category = 'apparel';
    document.querySelector('#posters').classList.add('clicked');
  }
};

// Events
document.addEventListener('DOMContentLoaded', () => {
  getCategory();
  return fetch(endpoints().ALL_PRODUCTS + category)
    .then((response) => response.json())
    .then((data) => {
      showData(data);
    });
});
