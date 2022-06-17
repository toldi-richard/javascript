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

const addToCart = (event) => {
    // kosárba és a + gombok szétválasztása

    // if else ágakat kerülni érdemes, főleg ha nagy a body-ja
    // let target = event.target.dataset.id
    // if (event.target.id) {
    //    target = event.target.id
    // }

    // ternary operátor
    let target = event.target.id ? event.target.id : event.target.dataset.id

    // Ha még nincs a kosárban akkor hozzáadjuk 1 db-vel
    if (cart[target] == undefined) {
        cart[target] = 1
        // Ha benne van akkor a darabszámát növeljük
    } else {cart[target]++}
}

// Kigyűjtjük az addtocart css class-ú elemeket
const addToCartButtons = document.getElementsByClassName('addToCart')
// Megnézzük, hogy mennyi van belőle
const buttonCount = addToCartButtons.length

for (let i = 0; i < buttonCount; i++) {
    // Klikk figyelő
    addToCartButtons[i].addEventListener('click',addToCart) // callback függvény, nem kell a () se az event átadás
}

const cartIcon = document.getElementById('cart-icon')
const cartContent = document.getElementById('cart-content')
const cartItems = document.getElementById('cart-items')
let total = 0

cartIcon.addEventListener('click', function(event) {
    cartContent.classList.toggle('active')
    cartIcon.classList.toggle('active')

    cartItems.innerHTML = ''

    for (const id in cart) {
        const currentProduct = products.find(product => product.id == id)

        cartItems.innerHTML += 
            `<li>
                <button data-id="${currentProduct.id}"> + </button>
                ${cart[id]} db -
                ${currentProduct.name}
                * ${currentProduct.price} Ft/db
            </li>`

        total += currentProduct.price * cart[id]

        // console.log(id, cart[id])
        // console.log(products.find(product => product.id == id).name)
        // console.log(cart[id])
        // console.log(products.find(product => product.id == id).price)
    }

    cartItems.innerHTML += `<li>

    Összesen: ${total} Ft
    </li>`

    // eseménykezelőre eseménykezelőt berakni nem biztos hogy érdemes, nagyobb programoknál
})

// querySelector 1 element választ ki ami megfelel a paramétereknek
const plusButtons = document.querySelectorAll('#car-items button')
// plusButtons.addEventListener()
// event delegation

// document.getElementsByTagName('body')[0].addEventListener('click', () => console.log('katt'))
// document.getElementsByTagName('main')[0].addEventListener('click', () => console.log('katt'))

cartItems.addEventListener('click', addToCart)







// Függvények ************************************************************************
// js - blockscope,a változó csak az első záró zárójelig él, kivéve a globális változók

// Nyíl függvény
const addToCart1 = () => {
}

// fat arrow esetén a () elhagyható
const addToCart2 = name => {
    console.log(name)
}

// ha a függvény test csak egy utasításból áll, elhagyható a {} is
const addToCart3 = name =>  console.log(name)

// 2-nél több argumentum adása nem ajánlott, akkor már objektumot érdemes adni neki
const person = {name: '', age: 0}
const hello = (person) => {
    console.log(person.name)
}

// visszatérési érték
const multiplier = (num1, num2) => {
    return num1 * num2
}

// Hagyományos függvény
const oldStyle = function () {
}

const tesztelek = name => console.log('Szia '+ name)
const tesztelek2 = name => {return console.log('Szia '+ name)}

// return 1 sorosnál elhagyható, de 1 argumentumnál a () nem hagyható el
const multiplier2 = (num1, num2) => num1*num2

// Függvények ************************************************************************