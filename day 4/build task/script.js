var time = new Date();
time.setDate(22);




function bodyload() {
    statusBadge();
    greetings();


}
function greetings() {
    var greetings = document.querySelector(".tagline");
    if (time.getHours() >= 5 && time.getHours() < 12) {
        greetings.innerText = "Good morning! Professional Bridal...";
    } else if (time.getHours() >= 12 && time.getHours() < 17) {
        greetings.innerText = "good afternoon! Professional Bridal...";
    } else if (time.getHours() >= 17 && time.getHours() < 19) {
        greetings.innerText = "Good evening! Professional Bridal...";
    }else {
        greetings.textContent = "Good Night! Professional Bridal Makeup Artist";
    }

}
function statusBadge() {
    var statusBadge = document.getElementById("status-badge");

    (time.getDay() !== 0 && (time.getHours()>10 && time.getHours()< 22 )) ? statusBadge.innerText = `🟢 Available for Booking` : statusBadge.innerText = `🔴 Currently Offline`
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