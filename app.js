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
let products = []
fetch('https://hur.webmania.cc/products.json')
    .then(response => response.json())
    // .then(data => console.log(data))
    // .then(data => products=data) mert products tömbben van az adatunk ezért ez kevés

    .then(data => { products=data.products,

        products.forEach(product => {

            productsSection.innerHTML += `<div>
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <img src="${product.picture}">
                <h3>${product.price}</h3>
                <a id="${product.id}" class='addToCart'>Kosárba</a>
            </div>`
        
            // Kigyűjtjük az addtocart css class-ú elemeket, a 4 db-t
            const addToCartButtons = document.getElementsByClassName('addToCart')

            // Megnézzük, hogy mennyi van belőle
            const buttonCount = addToCartButtons.length

            // Itt 1 event listenert sokszorosítunk, legírhatnánk 4 kül eventlistenert az id-kkal
            // de így szebb, sok esetén is jó és nem lesz tele eventlistenerrel a kódunk
            for (let i = 0; i < buttonCount; i++) {

                // Klikk figyelő az x db gombra aminek van saját id-ja
                addToCartButtons[i].addEventListener('click',addToCart) // callback függvény, nem kell a () se az event átadás
            }
        })
    })
    .catch(error => console.error(error))

const productsSection = document.getElementById('products')







// Kosár kezelése ******************************************************
const cart = {}

// Ennél a függvénynél el akarjuk kapni az eseményt
const addToCart = (event) => {
    // kosárba és a + gombok szétválasztása

    // if else ágakat kerülni érdemes, főleg ha nagy a body-ja
    // let target = event.target.dataset.id
    // if (event.target.id) {
    //    target = event.target.id
    // }

    // ternary operátor
    let target = event.target.id ? event.target.id : event.target.dataset.id

    // Ha még nincs a kosárban akkor hozzáadjuk 1 db-vel, itt a target az a cart tömbünk indexe lesz!!
    // Target az id száma lesz, és ezen az indexen szerepel majd a vásárolt mennyiség az adott termékből
    // Az index meg az adott termék id-ját tükrözi nekünk
    // Ha cart[x] nem létezik, akkor arra az indexre 1-t teszünk
    if (cart[target] == undefined) {
        cart[target] = 1

        // Ha benne van akkor a darabszámát növeljük, ha van ilyen indexünk, nüveljük eggyel
    } else {cart[target]++}
}


// Kosár újrarenderelésére funkció **************
const refreshCartItems = () => {
    
    // Kiürítjük, hogy az ul elemben a li-k ne halmozódjanak
    cartItems.innerHTML = ''
    let total = 0
    
    // Bejárjuk a cart-ot
    for (const id in cart) {
        // A bejárás során az eltárolt id-akt kikeressük és eltáráljuk az objektumot
        // a currentproduct-ba, amit a kosár mezőnél kiíratunk
        const currentProduct = products.find(product => product.id == id)
        // Current product tárolja a kosárba rakott objektumokat....

        // Itt az ul-ban kiíratjuk a current productban tárolt objektumokat
        cartItems.innerHTML += 
            `<li>
                <button data-id="${currentProduct.id}"> + </button>
                ${cart[id]} db -
                ${currentProduct.name}
                * ${currentProduct.price} Ft/db
            </li>`

        // console.log("Növelés előtt:" + total) debughoz kellett, a végösszeg miatt
        total += currentProduct.price * cart[id]
        // console.log("Növelés után:" + total)

        // console.log(id, cart[id])
        // console.log(products.find(product => product.id == id).name)
        // console.log(cart[id])
        // console.log(products.find(product => product.id == id).price)
    }
    cartItems.innerHTML += `<li>
    Összesen: ${total.toLocaleString()} Ft
    </li>` 
    // localstringgel az összeg formátuma tagolt lesz ezresek mentén
    // eseménykezelőre eseménykezelőt berakni nem biztos hogy érdemes, nagyobb programoknál
}







const cartIcon = document.getElementById('cart-icon') // Bevásárló kosár
const cartContent = document.getElementById('cart-content') // Bevásárló kosár oldal sávja

// Ez a kosár listáját, azon belül is az ul-t célozza meg, cart-items id-ja van
// Ez nem tárol, ez csak a kosárnál az ul elemet célozza meg
const cartItems = document.getElementById('cart-items')

cartIcon.addEventListener('click', function(event) { // A kosárra kattintáskor ez történik
    cartContent.classList.toggle('active') // Bevásárló kosár oldal sávja aktiválása kap extra css-t
    cartIcon.classList.toggle('active') // Bevesárló kosár hátternéek módosítására

    // Innen töröltük a li-s kiíratást a kosárban történő ábrázolásáról
    refreshCartItems()
})

// querySelector 1 element választ ki ami megfelel a paramétereknek
const plusButtons = document.querySelectorAll('#car-items button')
// plusButtons.addEventListener()
// event delegation

// document.getElementsByTagName('body')[0].addEventListener('click', () => console.log('katt'))
// document.getElementsByTagName('main')[0].addEventListener('click', () => console.log('katt'))


// Ennek az eseménynek átadok egy függvényt ami meghívja az addToCart és a refresh függvényünket
// cartItems.addEventListener('click', function () {
    // vagy fat arrow-val
cartItems.addEventListener('click', (event) => {
    // A JS call back esetén automatán gondoskodik hogy elkapjuk az eventet, de itt kézzel kell
    // erről gondoskodni, ezért (event) kell a () helyett
    addToCart(event)
    refreshCartItems()
})



// TOTO: Végösszegre vagy a termékre kattintva a termék id-ja elveszik és a végösszeg is eltűnik












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