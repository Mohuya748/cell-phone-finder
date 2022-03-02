
const errorMsg = document.getElementById("error-msg");
const errorMsgValue = document.getElementById("error-msg-value");
const phoneDetails = document.getElementById("search-phone");
const searchInput = document.getElementById("search-field");
const phoneMoreDetails = document.getElementById("phone-details");

const searchPhone = () => {
    const searchText = searchInput.value;
    // search input can't be empty 
    if (searchText === '') {
        phoneDetails.textContent = '';
        errorMsgValue.style.display = 'none';
        errorMsg.style.display = 'block';
        phoneMoreDetails.textContent = '';
    }

    else {
        errorMsg.style.display = 'none';
        errorMsgValue.style.display = 'none';
        // clear data 
        searchInput.value = '';
        // load data 
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // unknown value handle 
                if (data.data[0] === undefined) {
                    phoneDetails.textContent = '';
                    errorMsg.style.display = 'none';
                    errorMsgValue.style.display = 'block';
                    phoneMoreDetails.textContent = '';

                }
                else {
                    displayPhone(data.data)
                }
            })

    }

}

// get required phone section 
const displayPhone = data => {
    phoneDetails.textContent = '';
    phoneMoreDetails.textContent = '';
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

    }

}

// phone details section 
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}


const displayPhoneDetail = phone => {
    console.log(phone)
    phoneMoreDetails.textContent = '';
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
              <p class="card-text">
              <h5 class="card-title">${phone.name}</h5>
              Release Date: ${phone.releaseDate ? phone.releaseDate :'No realese date found'}</p>
              <h6>Main Features </h6>
              <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
              <p class="card-text">Displaysize: ${phone.mainFeatures.displaySize}</p>
              <p class="card-text">Chipset: ${phone.mainFeatures.chipSet}</p>
              <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
              <p class="card-text">Sensors: ${phone.mainFeatures.sensors}</p>
              <h6>Others</h6>
              <p class="card-text">WLAN: ${phone.others.WLAN}</p>
              <p class="card-text">Bluetooth: ${phone.others.Bluetooth}</p>
              <p class="card-text">GPS: ${phone.others.GPS}</p>
              <p class="card-text">NFC: ${phone.others.NFC}</p>
              <p class="card-text">Radio: ${phone.others.Radio}</p>
              <p class="card-text">USB: ${phone.others.Radio}</p>
            </div>
    `;
    phoneMoreDetails.appendChild(div);
    window.scrollTo(0, 0);
}