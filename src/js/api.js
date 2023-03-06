const url = "http://localhost:3000/items"

const itemTemplate = document.getElementById('item-card').content
// const itemList = document.querySelector('.items')

// console.log('itemlist',itemList);

export const getItems = async (itemList) => {

    fetch(url)
        .then(data => data.json())
        . then( data => data.map(item =>{
            // console.log(item);
            const newItem = document.importNode(itemTemplate,true)
            newItem.querySelector('.item__title').textContent = item.title
            newItem.querySelector('.item__price').textContent = `${item.price} ₽`
            newItem.querySelector('.item__image').src = item.images[0]
            itemList.appendChild(newItem)
        }))
}



