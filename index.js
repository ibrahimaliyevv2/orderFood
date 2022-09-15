
// Roles

const roles = [
    {
        id: 1,
        type: "admin",
    },
    {
        id: 2,
        type: "customer",
    },
    {
        id: 3,
        type: "restaurant",
    },
];



// Users

const users = [
    {
        id: 1,
        roleId: 1,
        username: "admin",
        password: "12",
    },
];

// Foods and orders

var foods = [];
var orders = [];



//#region  Containers

//login container
const loginContainer = document.querySelector(".login");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const logoutBtns = document.querySelectorAll(".logout");

//register container
const registerContainer = document.querySelector(".register");
const signInBtn = document.querySelector("#signIn");
const registerUsername = document.querySelector("#registerUsername");
const registerPassword = document.querySelector("#registerPassword");
const roleSelectContainer = document.querySelector("#roleSelect");
const roleSelect = document.querySelector(".roleSelect");
const registerPageRegisterBtn = document.querySelector("#registerPageRegister");
const budget = document.querySelector("#budget");
const userName = document.querySelector(".user-name");
const userBudget = document.querySelector(".user-budget");

//new food
const foodName = document.querySelector(".foodName");
const foodPrice = document.querySelector(".foodPrice");
const addNewFoodBtn = document.querySelector(".addNewFood");

//opwi container
const mainContainer = document.querySelector(".main-container");

//her container
const adminContainer = document.querySelector(".admin-container");
const userContainer = document.querySelector(".user-container");
const restaurantContainer = document.querySelector(".restaurant-container");
const allFoodsContainer = document.querySelector(".all-foods");
const ordersListContainer = document.querySelector(".orders-list");
const budgetContainer = document.querySelector(".budget-container");
const userAllFoodsContainer = document.querySelector(".user-all-foods");
const userAllFoodsBody = document.querySelector(".user-all-foods-body");


//#endregion


//global variables
let currentUser;
let role = "user";
let pendingRestaurants = [];

document.querySelector('.registerForm').addEventListener('submit', function(e){
    e.preventDefault();
})

// Login cases
const login = function () {
    let user = users.find(
        (user) =>
            user.username === username.value && user.password === password.value
    );
    currentUser = user;

    //admin
    if (user.roleId === 1) {
        userContainer.style.display = "none";
        restaurantContainer.style.display = "none";
        adminContainer.style.display = "block";
        renderAdminUI();
    } //user
    else if (user.roleId === 2) {
        adminContainer.style.display = "none";
        restaurantContainer.style.display = "none";
        userContainer.style.display = "block";
        renderUserUI();
    } //restaurant
    else if (user.roleId === 3) {
        userContainer.style.display = "none";
        adminContainer.style.display = "none";
        restaurantContainer.style.display = "flex";
        renderRestaurantUI();
    }

    loginContainer.style.display = "none";
    renderMainContainer();
};

//admin UI
const renderAdminUI = function () {
    adminContainer.innerHTML = "";

    for (const pendingRestaurant of pendingRestaurants) {
        if (pendingRestaurant.isAccept !== true) {
            adminContainer.innerHTML += `
        <div style="margin-top:30px;margin-left:30px;border:1px solid black; border-radius:20px;padding:25px; width:30%;">
            <p style="display:inline;font-size:25px;">${pendingRestaurant.username}</p>
            <button class="btn btn-danger accept" data-id="${pendingRestaurant.id}">Accept</button>
        </div>`;
        }
    }
    const acceptBtns = document.querySelectorAll(".accept");

    acceptBtns.forEach((acceptBtn) => {
        acceptBtn.addEventListener("click", (e) => {
            const pendingRestaurantId = Number(acceptBtn.getAttribute("data-id"));
            e.target.remove();
            const currentRestaurant = pendingRestaurants.find(
                (pR) => pR.id === pendingRestaurantId
            );
            currentRestaurant.isAccept = true;
            users.push(currentRestaurant);
        });
    });
};

//restaurant UI
const renderRestaurantUI = function () {
    const restaurantFoods = foods.filter(
        (food) => food.restaurantId === currentUser.id
    );
    allFoodsContainer.innerHTML = "";
    ordersListContainer.innerHTML = "";
    ordersListContainer.innerHTML += `<h1>Orders List</h1>`;
    allFoodsContainer.innerHTML += `<h1>All foods</h1>`;
    for (const restaurantFood of restaurantFoods) {
        allFoodsContainer.innerHTML += `
        <div style="height:max-content;margin-top:30px;margin-left:30px;border:1px solid black; 
            border-radius:20px;padding:25px;">
            <p style="display:inline;font-size:25px;">${restaurantFood.name} - </p>
            <p style="display:inline;font-size:25px; color:goldenrod;" class="price">${restaurantFood.price}$</p>
        </div>`;
    }
};

//user UI
const renderUserUI = function () {
    userAllFoodsBody.innerHTML = "";
    userName.innerHTML = `Current username: ${currentUser.username}`;
    userBudget.innerHTML = `Your current budget: ${currentUser.budget}$`;
    for (const food of foods) {
        const currentRes = users.find((user) => user.id === food.restaurantId);
        userAllFoodsBody.innerHTML += `
        <tr>
            <th scope="row">${food.name}</th>
            <td>${currentRes.username}</td>
            <td>${food.price}$</td>
            <td>
                <button class="btn btn-warning order" data-foodId=${food.id}>Order</button>
            </td>
        </tr>`;
    }

    const orderBtns = document.querySelectorAll(".order");
    orderBtns.forEach((orderBtn) => {
        orderBtn.addEventListener("click", () => {
            const foodId = Number(orderBtn.getAttribute("data-foodId"));
            orders.push({
                id: Math.floor(Math.random() * 1000),
                foodId: foodId,
                userId: currentUser.id,
            });
        });
    });
};

//add new food
addNewFoodBtn.addEventListener("click", () => {
    foods.push({
        id: Math.floor(Math.random() * 1000),
        name: foodName.value,
        restaurantId: currentUser.id,
        price: Number(foodPrice.value),
    });
    renderRestaurantUI();
});

//user or restaurant
const userOrRestaurant = function () {
    role = roleSelect.options[roleSelect.selectedIndex].value;
    if (role === "user") {
        budgetContainer.style.display = "block";
    } else if (role === "restaurant") {
        budgetContainer.style.display = "none";
    }
};
roleSelect.addEventListener("change", userOrRestaurant);

//register
const registerUI = function () {
    loginContainer.style.display = "none";
    registerContainer.style.display = "block";
};

registerBtn.addEventListener("click", () => {
    registerUI();
});

//register user
registerPageRegisterBtn.addEventListener("click", () => {
    registerContainer.style.display = "none";
    loginContainer.style.display = "block";
    const regUsername = registerUsername.value;
    const regPassword = registerPassword.value;
    if (role === "user") {
        users.push({
            id: Math.floor(Math.random() * 1000),
            roleId: roles[1].id,
            username: regUsername,
            password: regPassword,
            budget: Number(budget.value),
        });
    } else if (role === "restaurant") {
        pendingRestaurants.push({
            id: Math.floor(Math.random() * 1000),
            roleId: roles[2].id,
            username: regUsername,
            password: regPassword,
            isAccept: false,
        });
    }
});

// Render

const renderMainContainer = function () {
    mainContainer.style.display = "block";
};

//#region Buttons

//login btn
loginBtn.addEventListener("click", (e) => { 
    login();
});

// loginUI
const loginUI = function () {
    registerContainer.style.display = "none";
    loginContainer.style.display = "block";
};
// Sign in
signInBtn.addEventListener("click", () => {
    loginUI();
});

// Logout button
logoutBtns.forEach((logoutBtn) => {
    logoutBtn.addEventListener("click", () => {
        loginContainer.style.display = "block";
        mainContainer.style.display = "none";
    });
});

//#endregion