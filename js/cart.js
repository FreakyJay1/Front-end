// give values a name 
let carts = document.querySelectorAll('.add-cart');
const products =[
    {
        name: 'oldschool burger',
        tag: 'burger',
        price: 75,
        inCart:0,
    },
    {
        name: 'classic pizza',
        tag: 'pizza',
        price: 75,
        inCart:0,
    },
    {
        name: 'sunday ice-cream',
        tag: 'ice-cream',
        price: 40,
        inCart:0,
    },
    {
        name: 'Cold Drink',
        tag: 'Cold-drink',
        price: 25,
        inCart:0,
    },
    {
        name: 'sweety dessert',
        tag: 'dessert',
        price: 30,
        inCart:0,
    },
    {
        name: 'amazing breaksfast',
        tag: 'breaksfast',
        price: 35,
        inCart:0,
    },
]
// cart functions
for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}
function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart').textContent= productNumbers;   
    }
}
function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers)
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart').textContent= productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart').textContent= 1;
    }
    setItems(product);
}
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            };
        };
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
        [product.tag]: product
    }};
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    };
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer ){
        productContainer.innerHTML = ``;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=`
            <div class="product">
                <span>${item.name}</span>
            </div>
            <div class="product-price">R${item.price},00</div>
            <div class="product-quantity">
               <span>${item.inCart}</span>
            </div>
            <div class="product-total">R${item.inCart * item.price},00</div>
            `
        });
         productContainer.innerHTML +=  `
            <div class="cartTotalContainer">
                <h4 class="cartTotalTitle">
                Cart total
                </h4>
                <h4 class="cartTotal">
                R${cartCost},00
                </h4>
            </div>
         `;
    };
};
onloadCartNumbers();
displayCart();