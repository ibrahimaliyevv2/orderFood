// Users

const users = [
    {
        id: 1,
        email: 'admin',
        password: '12',
        role_id: 1
    },
]

const roles = [
    {
        id: 1,
        name: 'admin'
    },
    {
        id: 2,
        name: 'member'
    },
    {
        id: 3,
        name: 'restaurant'
    }
]


// Pages

const loginPage = document.querySelector('.login-page');
const registerPage = document.querySelector('.register-page');
const adminPage = document.querySelector('.admin-panel');
const restaurantPage = document.querySelector('.restaurant-panel');
const customerPage = document.querySelector('.customer-panel');


// Login Form and button

const loginForm = document.querySelector('.logInForm');
const loginBtn = document.querySelector('.logInBtn');


// Login Form gets prevent default

loginForm.addEventListener('submit', function(e){
    e.preventDefault();
})


// Login operation

let currentUser = null;

loginBtn.addEventListener('click', function(){
    const emailInput = document.querySelector('.emailInput');
    const passInput = document.querySelector('.passwordInput');

    const userNow = users.find(u => {
        return u.email === emailInput.value && passInput.value === u.password && u.role_id;
    })

    if(userNow && userNow.role_id == 1){
        adminPage.style.display = "block";
        customerPage.style.display = "none";
        restaurantPage.style.display = "none";
        loginPage.style.display = "none";
        registerPage.style.display ='none';
        currentUser = userNow;
    }
    else if(userNow && userNow.role_id == 2){
        adminPage.style.display = "none";
        customerPage.style.display = "block";
        restaurantPage.style.display = "none";
        loginPage.style.display = "none";
        registerPage,style.display ='none';
        currentUser = userNow;
    }
    else if(userNow && userNow.role_id == 3){
        adminPage.style.display = "none";
        customerPage.style.display = "none";
        restaurantPage.style.display = "block";
        loginPage.style.display = "none";
        registerPage,style.display ='none';
        currentUser = userNow;
    }
    else{
        restaurantPage.style.display = "block";
        loginPage.style.display = "none";
        registerPage,style.display ='none';
        currentUser = userNow;
    }
    else{
        adminPage.style.display = "none";
        customerPage.style.display = "none";
        restaurantPage.style.display = "none";
        registerPage.style.display ='none';
        loginPage.style.display = "block";
    }
    
    emailInput.value = "";
    passInput.value = "";
    
})


// Logout button

const logoutBtn = document.querySelectorAll(".logout");


// Logout operation

logoutBtn.forEach(e => {
    e.addEventListener("click", function () {
        adminPage.style.display = "none";
        customerPage.style.display = "none";
        restaurantPage.style.display = "none";
        registerPage,style.display ='none';
        loginPage.style.display = "block";
    })
})