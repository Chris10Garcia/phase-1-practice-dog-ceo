const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all";


document.addEventListener('DOMContentLoaded', ()=> getDogData())

// acquires both image and breed API data
function getDogData(){
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(data => placeDogImage(data.message)) 
    
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(data => handleDogBreed(data.message))
}




// deals with 1 thing and calls on 2
    // takes object in key : [array] and crates array of dog names 
    // calls to fix dropdown
    // adds eventlistener
function handleDogBreed(obj){
    
    const dogBread = []
    for (key in obj){
        if (obj[key].length === 0){
            dogBread.push(key)
        } else if (obj[key].length === 1){
            dogBread.push(`${obj[key]} ${key}`)
        } else {
            obj[key].forEach(dog => dogBread.push(`${dog} ${key}`))
        }
    }

    adjustDropDownOptions()

    // load list on initial page load
    placeDogBreed(dogBread)

    // adjust list when filtered list is selected
    document.querySelector('select#breed-dropdown').addEventListener('change', e => {
        dropDownFilter(e, dogBread)})
}


function adjustDropDownOptions(){
    const option = document.createElement('option')
    option.value = ""
    option.innerText = " "
    option.selected = true
    document.querySelector('select#breed-dropdown').prepend(option)
}

function dropDownFilter(e, array){
    let result = [];

    if (e.target.value){
        result = array.filter(dog => dog[0].toLowerCase() === e.target.value)
    } else {
        result = array
    }

    placeDogBreed(result)
}



// takes in an array of dog images and places it into DOM
function placeDogImage(array){
    const imageContainer = document.getElementById('dog-image-container')
    array.forEach(element => {
        const img = document.createElement('img')
        img.setAttribute ("src" , element)
        imageContainer.append(img)
    });
}

// takes in an array of dog breeds and adds it to the DOM
function placeDogBreed(array){
    const ulContainer = document.getElementById('dog-breeds')
    ulContainer.innerHTML = ''
    
    array.sort().forEach(element => {
        const li = document.createElement('li')
        li.addEventListener('click', (e) => e.target.style.color='red')
        li.innerText = element
        ulContainer.append(li)
    })
}

