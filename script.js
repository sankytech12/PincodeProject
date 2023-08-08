document.addEventListener("DOMContentLoaded", function () {
const pincodeInput = document.getElementById("pincode");
const nameInput= document.getElementById("name");
const citySelect = document.getElementById("city");
const stateSelect = document.getElementById("state");
const addressForm = document.getElementById("address-form");
const addressCard = document.getElementById("address-card");
const cardName = document.getElementById("card-name");
const cardCity = document.getElementById("card-city");
const cardState = document.getElementById("card-state");
const cartAddress=document.getElementById("card-address");


pincodeInput.addEventListener('input',async(event)=>{
    const pinCode=event.target.value;
    if(pinCode.length===6){
        const apiURL = `http://www.postalpincode.in/api/pincode/${pinCode}`;
    
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        if (data.Status === "Success") {
            const actData=data.PostOffice;
            const city=new Set();
            const state=actData[0].State;
            actData.forEach((element,idx) => {
                city.add(element.District);
            });
            citySelect.textContent="";
            city.forEach((element)=>{
                const ch=document.createElement("option");
                ch.value=element;
                ch.text=element;
                citySelect.appendChild(ch); 
            })
            stateSelect.innerHTML = `<option value="${state}">${state}</option>`;
            citySelect.disabled = false;
            stateSelect.disabled = false;

            // addressForm.style.display=none;
            // addressCard.style.display=block;

            // cardName.textContent = document.getElementById("name").value;
            // cardCity.textContent = city;
            // cardState.textContent = state;
        } else {
            alert("Invalid pincode. Please enter a valid pincode.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    }
})

addressForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData=new FormData(addressForm);
    const name=formData.get("fName");
    const pinCode=formData.get("pincode");
    const city=citySelect.options[citySelect.selectedIndex].text;
    const state=stateSelect.options[stateSelect.selectedIndex].text;
    //console.log(name,pinCode,city,state);
    
    cardName.textContent = name;
    cardCity.textContent = `${city}. ${pinCode}`;
    cardState.textContent = state;
    cartAddress.textContent=`${city}, ${state}, ${pinCode}.`
    addressCard.style.display="block";
    addressForm.style.display="none";
    citySelect.textContent="";
    stateSelect.textContent="";
    const ch=document.createElement("option");
    ch.value="";
    ch.text="Select City";
    citySelect.appendChild(ch); 
    const sh=document.createElement("option");
    sh.value="";
    sh.text="Select State";
    stateSelect.appendChild(sh); 
    citySelect.disabled = true;
    stateSelect.disabled = true;
    addressForm.reset();

});
});
