
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
                      <a class="btn btn-primary" onclick="loadPhoneDetail('${singleData.slug}')" href="#" role="button" >Details</a>
                    </div>
                   </div>

                `;
        phoneDetails.appendChild(div);
        console.log(singleData)

    }

}

const loadPhoneDetail = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}

const displayPhoneDetail = phone =>{
    const phoneMoreDetails = document.getElementById("phone-details");
    const div= document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
    `;
    phoneMoreDetails.appendChild(div);
    window.scrollTo(0,0);
}