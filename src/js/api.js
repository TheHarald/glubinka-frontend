import { handleLocation } from "./router"

const url = "http://localhost:3000/items"

const itemTemplate = document.getElementById('item-card').content

export const getItems = async (itemList) => {
    fetch(url)
        .then(data => data.json())
        . then( data => data.map(item =>{
            const newItem = document.importNode(itemTemplate,true)
            newItem.querySelector('.item__title').textContent = item.title
            newItem.querySelector('.item__price').textContent = `${item.price} ₽`
            newItem.querySelector('.item__image').src = item.images[0]
            const itemCard = newItem.querySelector('.item__card')
            itemCard.setAttribute('data-item-id',item.id)
            itemCard.addEventListener('click',getItem)
            // itemCard.addEventListener('click',toItem(item.id))
            itemList.appendChild(newItem)
        }))
        .catch(error =>{
                const label = document.createElement('p')
                label.textContent = error
                itemList.appendChild(label)
            })
}


function toItem(id){
    window.history.pushState({}, '', `/item/${id}`);
    handleLocation();
}

export function getItem(){
    const itemId = this.getAttribute('data-item-id')
    window.history.pushState({}, '', `/item`);
    handleLocation()
    // const itemId = window.location.pathname
    // console.log(itemId);

    fetch(`${url}/${itemId}`)
        .then(data => data.json())
        .then( data => {
            console.log(data);
            console.log(document.querySelector('.item-page'));

            document.querySelector('.item-page__title').textContent = data.title;
            document.querySelector('.item-page__price').textContent = `${data.price} ₽`;
            document.querySelector('.description__text').textContent = data.description;

            const sizesContainer = document.querySelector('.item-info__size-container')
            const smallImages = document.querySelector('.item-page__images-small')
            const bigImages = document.querySelector('.item-page__images')
            const colorsContainer = document.querySelector('.item-info__color-container')
            const detailsContainer = document.querySelector('.item-info__details')

            //set images
            data.images.map(image=>{
                const smallImage = document.createElement('img')
                smallImage.classList.add('item-page__image-small')
                smallImage.src = image
                smallImage.alt = data.title

                const bigImage = document.createElement('img')
                bigImage.classList.add('item-page__image')
                bigImage.src = image
                bigImage.alt = data.title

                smallImages.appendChild(smallImage)
                bigImages.appendChild(bigImage)
            })

            //set sizes
            data.sizes.map( (size,index) =>{
                const sizeElement = document.createElement('span')
                sizeElement.classList.add('item-info__szie')
                index || sizeElement.classList.add('selected')
                sizeElement.textContent = size
                sizesContainer.appendChild(sizeElement)
            })

            // set colors

            data.colors.map( color =>{
                const colorElement = document.createElement('span')
                colorElement.classList.add('item-info__szie')
                colorElement.textContent = color.title
                // colorElement.style.background = color.hex
                colorsContainer.appendChild(colorElement)
            })

            //set details

            data.details.map( detail=>{
                const detailParametErelement = document.createElement('span')
                const detailValueErelement = document.createElement('span')
                detailValueErelement.classList.add('description__text')
                detailParametErelement.classList.add('description__text')
                detailValueErelement.textContent = detail.value
                detailParametErelement.textContent = `${detail.parameter}:`

                detailsContainer.appendChild(detailParametErelement)
                detailsContainer.appendChild(detailValueErelement)

            })
        })


}



