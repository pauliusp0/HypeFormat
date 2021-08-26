// variables
const main = document.querySelector('main');
// Logic
let qty = 1;

// functions
const getItemById = () => {
  let id = location.hash.slice(1);
  fetch('http://localhost:5000/api/products/id/' + id).then((res) =>
    res.json().then((data) => showProduct(data))
  );
};

const showProduct = (data) => {
  main.innerHTML = `
    <section class="productview-section" >
  
    <div class="productview-container">
      
        <div class="productview-left-card">
            <img src=${data.image}> 
        </div>


        <div class="productview-right-card">
            <h1>${data.name}</h1>
            <h4>${data.price}</h4>
            <p>${data.short_description}</p>
            <label for="size">Size</label>
            <select id="size" name="Size" id="size">
                <option value="">Choose an option</option></select>
            <h4>${data.price}</h4>

            <div class="button-cont">
                <button id="qty-remove" class="qty">-</button>
                <input class="qty" value=${qty} type="text">
                <button id="qty-add" class="qty">+</button>
                <button class="add-basket-button">Add to cart</button>
            </div>

            <p>Category:${data.category}</p>
        </div> 
      
    </div>
    
            <div class="description">${data.description}</div>
            
    </section>
  `;

  if (data.attributes[0]) {
    data.attributes[0].options.forEach((option) => {
      document.querySelector('#size').innerHTML += `
      <option>${option}</option>
  `;
    });
  }

  document.querySelector('#qty-add').addEventListener('click', () => {
    qty = qty + 1;
    getItemById();
  });
  document.querySelector('#qty-remove').addEventListener('click', () => {
    if (qty > 1) qty = qty - 1;
    getItemById();
  });
};

// events
document.addEventListener('DOMContentLoaded', getItemById);
