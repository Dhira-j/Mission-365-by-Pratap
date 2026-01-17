var enquiryDetails = JSON.parse(localStorage.getItem("Enqiry")) ?? [];
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

const testimonials = [
    {
        id: 1,
        name: "Anjali Sharma",
        role: "Bridal Client",
        text: "Pratap is a true magician! My bridal makeup was exactly what I dreamed of—natural yet glamorous. It stayed perfect for 12 hours straight despite the heat.",
        stars: 4.5,
        image: "https://placehold.co/100x100/png?text=Anjali"
    },
    {
        id: 2,
        name: "Priya Verma",
        role: "Engagement Session",
        text: "I was so nervous about my look, but he made me feel so comfortable. The HD glow was incredible, and I got so many compliments on my eyes!",
        stars: 3.5,
        image: "https://placehold.co/100x100/png?text=Priya"
    },
    {
        id: 3,
        name: "Sneha Reddy",
        role: "Cocktail Party",
        text: "Fast, professional, and very talented. He knows exactly which colors suit your skin tone. I highly recommend him for any special occasion.",
        stars: 4,
        image: "https://placehold.co/100x100/png?text=Sneha"
    },
    {
        id: 4,
        name: "Mehak Singh",
        role: "Bridesmaid Makeup",
        text: "We were a group of 5, and Pratap managed all of us perfectly on time. Every single one of us looked stunning. Great time management skills!",
        stars: 5,
        image: "https://placehold.co/100x100/png?text=Mehak"
    }
];


let currentIndex = 0;

function restrictCalendar() {
    var dateInput = document.getElementById("serviceDate");
    var today = new Date();

    // 1. Get Year, Month, and Day
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-11, so we add 1
    var dd = String(today.getDate()).padStart(2, '0');

    // 2. Combine into YYYY-MM-DD
    var minDate = `${yyyy}-${mm}-${dd}`;

    // 3. Set the 'min' attribute of your input
    dateInput.setAttribute("min", minDate);
}

// 1. Function to handle Star Logic (Full, Half, Empty)
function getStarIcons(rating) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            html += '<i class="bi bi-star-fill"></i>';
        } else if (i === Math.floor(rating) + 1 && (rating % 1) >= 0.25) {
            html += '<i class="bi bi-star-half"></i>';
        } else {
            html += '<i class="bi bi-star"></i>';
        }
    }
    return html;
}

// 2. Function to Render the current testimonial
function renderTestimonial() {
    const stage = document.getElementById("testimonial-stage");
    const { name, role, text, stars, image } = testimonials[currentIndex];

    stage.innerHTML = `
        <div class="test-image"><img src="${image}" alt="${name}"></div>
        <h3 class="test-name">${name}</h3>
        <p class="test-role">${role}</p>
        <p class="test-msg">"${text}"</p>
        <div class="test-star">${getStarIcons(stars)}</div>
    `;
    updateButtonStates();
}

function renderAllTestimonials() {
    const stage = document.getElementById("testimonial-stage");
    stage.innerHTML = "";
    var stageCard = "";

    for (var data of testimonials) {
        const { name, role, text, stars, image } = data;

        // WRAPPER DIV START (<div class="testimonials-card">)
        stageCard += `
            <div class="testimonials-card">
                <div class="test-image"><img src="${image}" alt="${name}"></div>
                <h3 class="test-name">${name}</h3>
                <p class="test-role">${role}</p>
                <p class="test-msg">"${text}"</p>
                <div class="test-star">${getStarIcons(stars)}</div>
            </div>
        `;
        // WRAPPER DIV END
    }

    stage.innerHTML = stageCard;
}

// 3. Function to update Button UI
function updateButtonStates() {
    const leftBtn = document.querySelector(".left");
    const rightBtn = document.querySelector(".right");

    leftBtn.disabled = (currentIndex === 0);
    rightBtn.disabled = (currentIndex === testimonials.length - 1);
}

// 4. Click Handlers
function initSlider() {
    document.querySelector(".right").addEventListener("click", () => {
        if (currentIndex < testimonials.length - 1) {
            currentIndex++;
            renderTestimonial();
        }
    });

    document.querySelector(".left").addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderTestimonial();
        }
    });
}

function initTestimonials() {
    const stage = document.getElementById("testimonial-stage");

    // 1. Desktop & Tablet Logic (min-width: 768px)
    if (window.innerWidth >= 768) {
        // Show ALL cards because the Grid will handle the 2 or 3 columns
        renderAllTestimonials();

        // Hide navigation buttons
        document.querySelector(".left").style.display = "none";
        document.querySelector(".right").style.display = "none";
    }
    // 2. Mobile Logic (Less than 768px)
    else {
        // Show only ONE card for the slider
        renderTestimonial(currentIndex);

        // Show navigation buttons
        document.querySelector(".left").style.display = "flex";
        document.querySelector(".right").style.display = "flex";
    }
}

// Automatically re-check the layout whenever the screen size changes
window.addEventListener('resize', initTestimonials);

function serviceCard() {
    var service = document.querySelector(".services-grid");

    for (var value of services) {
        var data = document.createElement("div");
        data.className = "services";
        data.innerHTML =
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
    share();
    renderTestimonial();
    initSlider();
    initTestimonials();
    restrictCalendar();


}



var isValue = enquiryDetails.length === 0 ? "" : enquiryDetails[enquiryDetails.length - 1].username
function greetings() {
    var message = "";
    var username = document.getElementById("username");
    var phone = document.getElementById("phone");
    var date = document.getElementById("serviceDate");

    if (isValue == "") {
        message = "Professional Bridal...";
    } else {
        message = `${isValue}! Welcome back.`;
        username.value = isValue;
        phone.value = enquiryDetails[enquiryDetails.length - 1].phone;
        date.value = enquiryDetails[enquiryDetails.length - 1].date;
    }
    var greetings = document.querySelector(".tagline");
    if (time.getHours() >= 5 && time.getHours() < 12) {
        greetings.innerHTML = `"Good morning! ${message}"`;
    } else if (time.getHours() >= 12 && time.getHours() < 17) {
        greetings.innerHTML = `"good afternoon! ${message}"`;
    } else if (time.getHours() >= 17 && time.getHours() < 19) {
        greetings.innerHTML = `"Good evening! ${message}"`;
    } else {
        greetings.innerHTML = `"Good Night! ${message}";`
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




    event.preventDefault();


    // 2. Get all values
    var username = document.getElementById("username");
    var phone = document.getElementById("phone");
    var date = document.getElementById("serviceDate");

    //populate the value



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

    const selectedDate = new Date(date.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log(selectedDate);
    console.log(today);




    // Check Date
    if (date.value === "") {
        date.style.border = "2px solid red";
        dateError.innerText = "Please select a date";
        isValid = false;
    } else if (selectedDate < today) { // Use the object variable here!
        event.preventDefault(); // Use 'event', not 'e'
        alert("You cannot select a past date!");
        isValid = false;
    } else {
        date.style.border = "2px solid green";
    }





    // 6. Final Decision
    if (isValid === true) {
    // 1. Check if the DATE is already taken by ANYONE
    var dateTaken = enquiryDetails.find(user => user.date === date.value);
    
    // 2. Check if the USERNAME has already made any booking
    var userHasBooking = enquiryDetails.find(user => user.username.toLowerCase() === username.value.toLowerCase().trim());

    if (dateTaken) {
        // ERROR: Someone else already booked this date
        event.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: 'Date Unavailable 📅',
            html: `Sorry, this date is already fully booked by another client.`,
            confirmButtonText: 'Pick another date'
        });
        isValid = false;
    } 
    else if (userHasBooking) {
        // ERROR: This specific user is trying to book a second time
        event.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Multiple Bookings Not Allowed ⚠️',
            html: `Hi <b>${username.value}</b>, you already have a booking on <b>${userHasBooking.date}</b>.`,
            confirmButtonText: 'Got it'
        });
        isValid = false;
    } 
    else {
        // SUCCESS: Date is free and User is new
        enquiryDetails.push({
            username: username.value,
            phone: phone.value,
            date: date.value
        });

        Swal.fire({
            icon: 'success',
            title: 'Booking Confirmed 🎉',
            html: `<b>${username.value}</b>, your appointment is set for ${date.value}.`,
            confirmButtonText: 'Great!'
        });
        
        localStorage.setItem("Enqiry", JSON.stringify(enquiryDetails));
        document.getElementById("bookingForm").reset();
    }
}
}


function toggleTheme() {
    var toggle = document.querySelector(".theme-toggle");
    var btnIcon = document.querySelector(".btn"); // This is your icon div

    toggle.addEventListener("click", function () {
        // 1. Toggle the class on body
        document.body.classList.toggle("dark-mode");

        // 2. Check if dark-mode is active to change icon
        if (document.body.classList.contains("dark-mode")) {
            btnIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
        } else {
            btnIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
        }
    });
}

function share() {
    var Share = document.querySelector(".share");
    Share.addEventListener("click", function () {
        sharePortfolio();
    });
}


// Function jo humara share menu open karega
async function sharePortfolio() {
    // 1. Check karna ki browser ye feature support karta hai ya nahi
    if (navigator.share) {
        try {
            // 2. Data Packet bhejna (Title, Text aur URL)
            await navigator.share({
                title: 'Dhiraj Kumar | Bridal Makeup Portfolio',
                text: 'Check out this professional bridal makeup portfolio!',
                url: window.location.href // Ye automatic aapki current website ka link utha lega
            });
            console.log('Portfolio shared successfully!');
        } catch (error) {
            // 3. Agar user ne cancel kar diya ya koi error aaya
            console.log('Sharing failed or cancelled:', error);
        }
    } else {
        // 4. Fallback: Agar browser support nahi karta (Jaise purane PCs)
        alert("Web Share is not supported on this browser. You can copy the link manually: " + window.location.href);
    }
}