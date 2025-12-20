
var time = new Date();


const services = [
  {
    id: 1,
    title: "Bridal Makeup",
    description: "Premium HD & Airbrush makeup designed to last all day and look flawless in photography.",
    price: "15,000",
    duration: "3-4 Hours",
    category: "Bridal",
    image: "https://placehold.co/600x400/png?text=Bridal+Makeup"
  },
  {
    id: 2,
    title: "Engagement Glam",
    description: "Soft, glowing makeup for your ring ceremony and pre-wedding events.",
    price: "8,000",
    duration: "2 Hours",
    category: "Pre-Wedding",
    image: "https://placehold.co/600x400/png?text=Engagement+Glam"
  },
  {
    id: 3,
    title: "Party Makeup",
    description: "Trendy and elegant makeup for birthdays, anniversaries, or evening parties.",
    price: "5,000",
    duration: "1.5 Hours",
    category: "Events",
    image: "https://placehold.co/600x400/png?text=Party+Makeup"
  },
  {
    id: 4,
    title: "Cocktail Look",
    description: "Bold eyes and glamorous style perfect for cocktail nights.",
    price: "6,500",
    duration: "2 Hours",
    category: "Events",
    image: "https://placehold.co/600x400/png?text=Cocktail+Look"
  },
  {
    id: 5,
    title: "Mehendi Ceremony Glow",
    description: "Natural, radiant look with floral accents for Mehendi functions.",
    price: "7,000",
    duration: "2 Hours",
    category: "Pre-Wedding",
    image: "https://placehold.co/600x400/png?text=Mehendi+Glow"
  },
  {
    id: 6,
    title: "Photoshoot Makeup",
    description: "Camera-ready makeup with matte finish for professional shoots.",
    price: "9,000",
    duration: "2.5 Hours",
    category: "Professional",
    image: "https://placehold.co/600x400/png?text=Photoshoot+Makeup"
  }
];


function serviceCard(){
    var service=document.querySelector(".services-grid");
    
    for(var value of services){
        var data=document.createElement("div");
        data.className="services";
        data.innerHTML=
        `
        
                        <div class="img"><img src="${value.image}" alt="${value.title}" srcset=""></div>
                        <div class="title">${value.title}</div>
                        <div class="desc">${value.description}</div>
                         <div class="price">&#8377; ${value.price}</div>  
                         <div class="category">${value.category}</div> 

                    

        `;
        service.append(data);
    }
}

function bodyload() {
    statusBadge();
    greetings();
    serviceCard();
    toggleTheme();


}
function greetings() {
    var greetings = document.querySelector(".tagline");
    if (time.getHours() >= 5 && time.getHours() < 12) {
        greetings.innerHTML = `"Good morning! Professional Bridal..."`;
    } else if (time.getHours() >= 12 && time.getHours() < 17) {
        greetings.innerHTML = `"good afternoon! Professional Bridal..."`;
    } else if (time.getHours() >= 17 && time.getHours() < 19) {
        greetings.innerHTML = `"Good evening! Professional Bridal..."`;
    } else {
        greetings.innerHTML = `"Good Night! Professional Bridal...";`
    }

}
function statusBadge() {
    var statusBadge = document.getElementById("status-badge");

    (time.getDay() !== 0) ? statusBadge.innerText = `🟢 Available for Booking` : statusBadge.innerText = `🔴 Currently Offline (Weekend)`
}

var whatsapp = document.querySelectorAll(".btn-whatsapp");
var instagram = document.querySelector(".btn-instagram");


for (var button of whatsapp) {
    button.addEventListener("click", function () {
        alert("Connecting you to the artist...");
    })
};

instagram.addEventListener("click", function () {
    alert("Connecting you to the artist...");
})


function validateForm(event) {
    // 1. Stop the page from refreshing
    event.preventDefault();

    // 2. Get all values
    var username = document.getElementById("username");
    var phone = document.getElementById("phone");
    var date = document.getElementById("serviceDate");
    
    // 3. Get all error display areas
    var nameError = document.getElementById("nameError");
    var phoneError = document.getElementById("phoneError");
    var dateError = document.getElementById("dateError");
    var successMsg = document.getElementById("successMsg");

    // 4. Reset previous errors (Clear red borders/text before checking)
    username.style.border = "1px solid #ccc";
    phone.style.border = "1px solid #ccc";
    date.style.border = "1px solid #ccc";
    nameError.innerText = "";
    phoneError.innerText = "";
    dateError.innerText = "";
    successMsg.innerText = "";

    // 5. The "Flag" - We assume form is valid, unless we find an error
    var isValid = true; 

    // --- Validation Logic ---

    // Check Name
    if (username.value.trim().length < 3) {
        username.style.border = "2px solid red";
        nameError.innerText = "Name must be at least 3 characters";
        isValid = false; // Mark form as invalid
    } else {
        username.style.border = "2px solid green";
    }

    // Check Phone (Regex)
    const phonePattern = /^\d{10}$/;
    if (!phone.value.match(phonePattern)) {
        phone.style.border = "2px solid red";
        phoneError.innerText = "Phone must be exactly 10 digits";
        isValid = false;
    } else {
        phone.style.border = "2px solid green";
    }

    // Check Date
    if (date.value === "") {
        date.style.border = "2px solid red";
        dateError.innerText = "Please select a date";
        isValid = false;
    } else {
        date.style.border = "2px solid green";
    }

    // 6. Final Decision
    if (isValid === true) {
        // If the flag is still true, everything passed!
        successMsg.innerText = `Booking Confirmed for ${username.value}!`;
        successMsg.style.display="block";
        // Optional: Clear form
         document.getElementById("bookingForm").reset();
    }
}


function toggleTheme(){
    var toggle = document.querySelector(".theme-toggle");
    var btnIcon = document.querySelector(".btn"); // This is your icon div

    toggle.addEventListener("click", function(){
        // 1. Toggle the class on body
        document.body.classList.toggle("dark-mode");

        // 2. Check if dark-mode is active to change icon
        if(document.body.classList.contains("dark-mode")){
            btnIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
        } else {
            btnIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
        }
    });
}
