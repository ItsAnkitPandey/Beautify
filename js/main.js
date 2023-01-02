let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name:'Hand Soap',
        tag: 'product1',
        price: 39,
        inCart: 0 
    },
    {
        name:'Mermaid Oil',
        tag: 'product2',
        price: 52,
        inCart: 0 
    },
    {
        name:'Bakuchiol',
        tag: 'product3',
        price: 74,
        inCart: 0 
    }
];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        alert("Added to cart!");
        // carts.textContent = "Added to Cart";
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.icons span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.icons span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.icons span').textContent = 1;
    }
    
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);  
    
    if(cartItems != null){
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);   
    }

}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    let cartCost = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems)
    let productContainer = document.querySelector(".products");
    if (cartItems && productContainer) {
        productContainer.innerHTML = "" ;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle"></ion-icon>
            <img class="cart-img" src="images/${item.tag}.webp">
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div> 
            <div class="quantity">
            <ion-icon name="caret-back-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="caret-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
            $${item.inCart * item.price}
            </div>
            ` ;
        });
        productContainer.innerHTML += `
            <div class="grandTotalContainer">
            <h4 class="grandTotalTitle">TOTAL</h4>
            
            <h4 class="grandTotal">$${cartCost}</h4>
        `;
    }
}

onLoadCartNumbers();
displayCart();