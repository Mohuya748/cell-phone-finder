
const searchPhone = () => {
    const searchInput = document.getElementById("search-field");

    const searchText = searchInput.value;
    searchInput.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = data => {
    const phoneDetails = document.getElementById("search-phone");
    for (const singleData of data.slice(0, 20)) {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML =
            `<div class="card">
                 <div class="card-body">
                    <img src="${singleData.image}" class="card-img-top w-100" alt="...">
                      <h5 class="card-title">${singleData.phone_name}</h5>
                      <p class="card-text">${singleData.brand}</p>
                
                    </div>
                   </div>

                `;
        phoneDetails.appendChild(div);
        console.log(singleData)

    }

    // }

}

const loadPhoneDetail = () => {

}