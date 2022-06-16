// Oldalsó menü kezelése *************************************************
const vegburger = document.getElementById('vegburger')
const nav = document.getElementById('nav')
// Klikkre css osztályokat cserélünk
vegburger.addEventListener('click', function (event) {
    nav.classList.toggle('menu-active')
    vegburger.classList.toggle('fi-align-justify')
    vegburger.classList.toggle('fi-arrow-left')
    // vegburger.classList.toggle('burger-active')
})

// Termékek beillesztése *************************************************
// Ez ált backendről jön API-tól
const products = [
    {
        id: 1,
        name: 'Málna',
        picture: 'malna.jpg',
        description: 'Kézzel terlmelt egészség.',
        price: 3800,
        inStock: true
    },
    {
        id: 2,
        name: 'Szeder',
        picture: 'szeder.jpg',
        description: 'Kézzel terlmelt egészség.',
        price: 3250,
        inStock: true,
        variations: ['fehér', 'fekete']
    },
    {
        id: 3,
        name: 'Áfonya',
        picture: 'afonya.jpg',
        description: 'Kézzel terlmelt egészség.',
        price: 1700,
        inStock: true
    },
    {
        id: 4,
        name: 'Extra',
        picture: 'afonya.jpg',
        description: 'Kézzel terlmelt egészség.',
        price: 1700,
        inStock: true
    }
]

const productsSection = document.getElementById('products')

// TODO: inStock, variations kezelése
products.forEach(product => {

    productsSection.innerHTML += `<div>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <img src="./img/${product.picture}">
        <h3>${product.price}</h3>
        <a id="${product.id}" class='addToCart'>Kosárba</a>
    </div>`
})

// Kosár kezelése ******************************************************
const cart = {}

// Kigyűjtjük az addtocart css class-ú elemeket
const addToCartButtons = document.getElementsByClassName('addToCart')
// Megnézzük, hogy mennyi van belőle
const buttonCount = addToCartButtons.length

for (let i = 0; i < buttonCount; i++) {
    // Klikk figyelő
    addToCartButtons[i].addEventListener('click', function (event) {
        // console.log(event.target.id)

        // Ha még nincs a kosárban akkor hozzáadjuk 1 db-vel
        if (cart[event.target.id] == undefined) {
            cart[event.target.id] = 1

            // Ha benne van akkor a darabszámát növeljük
        } else {cart[event.target.id]++}
    })
}

const cartIcon = document.getElementById('cart-icon')
const cartContent = document.getElementById('cart-content')
cartIcon.addEventListener('click', function(event) {
    cartContent.classList.toggle('active')
    for (const id in cart) {
        // console.log(id, cart[id])
        console.log(products.find(product => product.id == id).name)
        console.log(cart[id])
        console.log(products.find(product => product.id == id).price)
    }
})