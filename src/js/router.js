import { getItems } from "./api";

const navigationItems = document.querySelectorAll('.navigation__item')

export function initNavigation() {
    navigationItems.forEach(nav => {
        nav.onclick = route
    })
}

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/src/pages/404/404.html",
    "/": "/src/pages/main/main.html",
    "/all": "/src/pages/all/all.html",
    "/item": "/src/pages/item/item.html",
};


export const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
    let index = Object.keys(routes).splice(1).indexOf(path)
    navigationItems.forEach(i => i.classList.remove('selected-page'))
    navigationItems[index].classList.add('selected-page')
    if (path === '/all') {
        const itemList = document.querySelector('.items')
        getItems(itemList)
    }

};



window.onpopstate = handleLocation;
window.route = route;

handleLocation();
