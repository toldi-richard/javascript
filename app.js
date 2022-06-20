// Oldalsó menü kezelése *************************************************
const vegburger = document.getElementById('vegburger')
const nav = document.getElementById('nav')


// Klikkre css osztályokat cserélünk
vegburger.addEventListener('click', function() {
    nav.classList.toggle('menu-active')
    vegburger.classList.toggle('fi-align-justify')
    vegburger.classList.toggle('fi-arrow-left')
    // vegburger.classList.toggle('burger-active')
    console.log(this)
})
// this más lesz fat arrow esetén mint a hagyományos függvény formáknál
// hagyományos esetén a html elem kerül kiírásra, fat arrow esetén window-t adja ki
nav.addEventListener('mouseleave', () => {
    // nav.classList.toggle('menu-active') ez is jó add és a remove-t váltja
    nav.classList.remove('menu-active')
    vegburger.classList.remove('fi-arrow-left')
    vegburger.classList.add('fi-align-justify')
    console.log(this)
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
            // Kül változóba kiszerveztük, mert ha simán productsSection.innerHTML hoz fűzünk
            // hamarabb zárja a div-t és a link/gomb kikerül a boxból
            let content = productsSection.innerHTML
            content += `<div>
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <img src="${product.picture}">
                <h3>${product.price}</h3>`
            if(product.stock > 0) {    
                content += `<a id="${product.id}" class='addToCart'>Kosárba</a>`}
            else {content += `Nem rendelhető!`}
            content +=`</div>`

            productsSection.innerHTML = content
        
            // Kigyűjtjük az addtocart css class-ú elemeket, a 4 db-t
            const addToCartButtons = document.getElementsByClassName('addToCart')

            // Megnézzük, hogy mennyi van belőle
            const buttonCount = addToCartButtons.length

            // Itt 1 event listenert sokszorosítunk, leírhatnánk 4 kül eventlistenert az id-kkal
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

// Mágikus számok :D, érdemes kiszervezni, mert 3-4 hó után nem biztos hogy tudjuk mi micsoda
// keresést is könnyítheti...illetve a kód értelmezését segíthetik ha beszédesek a változó nevek
const discountMinPrice = 30000
const dicsountMinPieces = 10
const discount = 0.1

// Kosár újrarenderelésére funkció **************
const refreshCartItems = () => {
    
    // Kiürítjük, hogy az ul elemben a li-k ne halmozódjanak
    cartItems.innerHTML = ''
    let total = 0, maxPieces = 0
    
    // Bejárjuk a cart-ot
    for (const id in cart) {
        // A bejárás során az eltárolt id-akt kikeressük és eltáráljuk az objektumot
        // a currentproduct-ba, amit a kosár mezőnél kiíratunk
        const currentProduct = products.find(product => product.id == id)
        // Current product tárolja a kosárba rakott objektumokat....

        // Itt az ul-ban kiíratjuk a current productban tárolt objektumokat

        // TODO: - gomb berakása
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

        maxPieces = cart[id] > maxPieces ? cart[id] : maxPieces
    }
    cartItems.innerHTML += `<li>
    Összesen: ${total.toLocaleString()} Ft
    </li>` 
    // localstringgel az összeg formátuma tagolt lesz ezresek mentén
    // eseménykezelőre eseménykezelőt berakni nem biztos hogy érdemes, nagyobb programoknál

    if(total > discountMinPrice || maxPieces >= dicsountMinPieces) {
        cartItems.innerHTML += `<li>
        Kedvezmény: ${(total * discount).toLocaleString()} Ft
        </li>`
        cartItems.innerHTML += `<li>
        Fizetendő: ${(total - total * discount).toLocaleString()} Ft
        </li>` 
    }
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





// TODO: Végösszegre vagy a termékre kattintva a termék id-ja elveszik és a végösszeg is eltűnik
// TODO: Rendelési adatok megadása és akár emailben leküldése....
// TODO: Esetleg más színek használata...új dizájn
// TODO: PHP MVC-re átalakítás gyakorlásnak
// TODO: VueJS-re átalakítás gyakorlásnak
// TODO: C# ASP webapi db-vel és VueJS cliensel megcsinálni átalakítás gyakorlásnak







// Változók **************************************************************************
test = 5 // var test = 5 ugyanaz, nem jó mert globális és véletlen felülírhatjuk
// === típusos összehasonlítás, ha nem csak az eredményt akarjuk 0 == '' is true-t ad




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