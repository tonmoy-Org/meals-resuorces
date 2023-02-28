const loadMeal = async(searchText, dataLimit) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    const slicedData = data.meals ;
    displayMeal(slicedData, dataLimit);
}

const displayMeal = (meal, dataLimit) => {
    console.log(meal);
    const mealsContainer1 = document.getElementById('meals-container1');
    mealsContainer1.innerHTML ='';
    
    const textWarning = document.getElementById('warning-text');
    if (meal == null) {
        textWarning.classList.remove('d-none');
    }
    else {
        textWarning.classList.add('d-none');

    }
   const showAll = document.getElementById('show-more');
   if (dataLimit && meal.length < 10) {
       meal = meal.slice(0, 10);
       showAll.classList.remove('d-none');
   }
   else {
       showAll.classList.add('d-none');
   }


 
    meal.forEach(meals => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
            <div class="card h-100">
                <img src="${meals.strMealThumb}" class="card-img-top " alt="...">
                <div class="card-body">
                <h5 class="card-title">${meals.strMeal}</h5>
                <p class="card-text">${meals.strArea}</p>
                <p class="card-text">${meals.strTags ? meals.strTags : "No Tag"}</p>
                <a href="${meals.strYoutube}" class="card-text text-decoration-none fw-bold">YouTube</a>
                </div>
            </div>
        `;
        mealsContainer1.appendChild(mealDiv);
    })
    
}

const processSearch = (dataLimit) => {
    // show spinner
    
    const getText = document.getElementById('get-text');
    const text = getText.value;
    loadMeal(text, dataLimit);
    console.log(text)
}
// for search button
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);
    

})
// press enter button to search
document.getElementById('get-text').addEventListener('keydown', function (event) {
    console.log(event.key)
    if (event.key === 'Enter') {
        processSearch(10);
    }
})

document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
    console.log('hey')
})


const loadItems = async() => {
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    const res = await fetch(url);
    const data = await res.json();
    displayRandom(data.categories);
}
const displayRandom = (items) =>{
    const mealsContainer2 = document.getElementById('meals-container2');
    mealsContainer2.innerHTML = '';
    // mealsContainer2.innerHTML ='';
    console.log(items);
    items.forEach(item => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
            <div class="card h-100">
                <img src="${item.strCategoryThumb}" class="card-img-top " alt="...">
                <div class="card-body">
                <h5 class="card-title">${item.strCategory}</h5>
                <a href="${item.strYoutube}" class="text-decoration-none fw-bold">YouTube</a>
                </div>
            </div>
        `;
       mealsContainer2.appendChild(mealDiv);
    })
    
    
}

loadMeal('Arrabiata');
loadItems();