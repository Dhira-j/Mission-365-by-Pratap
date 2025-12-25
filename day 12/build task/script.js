var userData;
userData = JSON.parse(localStorage.getItem("UserDetails")) ?? [];

function formData() {
    var form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let username = e.target.username.value;
        let mobile = e.target.mobile.value;
        let email = e.target.email.value;
        let message = e.target.message.value;


        //logic for unique data 
        var isuserName = userData.some(user => user.username === username);
        var ismobile = userData.some(user => user.mobile == mobile);
        var isemail = userData.some(user => user.email == email);


        if (isuserName) {
            alert("Username already exists");
        } else if (ismobile) {
            alert("Mobile already exists");
        } else if (isemail) {
            alert("Email already exists");
        } else {
            userData.push({ username, mobile, email, message });
        }




        localStorage.setItem("UserDetails", JSON.stringify(userData));



        fetchData();
        e.target.reset();

    })
}


function fetchData() {
    let data = "";
    var container = document.querySelector(".main");
    container.innerHTML = "";


    userData.forEach((value, i) => {

        data += `<div class="item">
                <span class="cross" onclick="deleteEntries(${i})">&times;</span>
                <h5>Name</h5>
                <div>${value.username}</div>
                <h5>Mobile</h5>
                <div>${value.mobile}</div>
                <h5>Email</h5>
                <div>${value.email}</div>
                <h5>Message</h5>
                <div>${value.message}</div>
            </div>`;

    });

    container.innerHTML = data;



}

function deleteEntries(i) {
    userData.splice(i, 1);
    localStorage.setItem("UserDetails", JSON.stringify(userData));
    fetchData();

}

function bodyload() {
    formData();
    fetchData();
}



