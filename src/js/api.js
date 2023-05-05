import { handleLocation } from "./router"

const ghUrl = "https://raw.githubusercontent.com/TheHarald/glubinka-frontend/master/store-items/db.json"

const itemTemplate = document.getElementById('item-card').content

export const getItems = async (itemList) => {
    fetch(ghUrl)
        .then(data => data.json())
        .then(data => data.items.map(item => {
            const newItem = document.importNode(itemTemplate, true)
            newItem.querySelector('.item__title').textContent = item.title
            newItem.querySelector('.item__price').textContent = `${item.price} ₽`
            newItem.querySelector('.item__image').src = item.images[0]
            const itemCard = newItem.querySelector('.item__card')
            itemCard.setAttribute('data-item-id', item.id)
            itemCard.addEventListener('click', getItem)
            itemList.appendChild(newItem)
        }))
        .catch(error => {
            const label = document.createElement('p')
            label.textContent = error
            itemList.appendChild(label)
        })
}



export async function getItem() {
    const itemId = this.getAttribute('data-item-id')
    window.history.pushState({}, '', `/item`);
    await handleLocation()

    fetch(ghUrl)
        .then(data => data.json())
        .then(data => {
            const item = data.items.find(item => item.id === itemId)
            document.querySelector('.item-page__title').textContent = item.title;
            document.querySelector('.navigation__item.item-page-helper').textContent = item.title;
            document.querySelector('.item-page__price').textContent = `${item.price} ₽`;
            document.querySelector('.description__text').textContent = item.description;

            const sizesContainer = document.querySelector('.item-info__size-container')
            const smallImages = document.querySelector('.item-page__images-small')
            const bigImages = document.querySelector('.item-page__images')
            const colorsContainer = document.querySelector('.item-info__color-container')
            const detailsContainer = document.querySelector('.item-info__details')

            //set images
            item.images.map(image => {
                const smallImage = document.createElement('img')
                smallImage.classList.add('item-page__image-small')
                smallImage.src = image
                smallImage.alt = item.title

                const bigImage = document.createElement('img')
                bigImage.classList.add('item-page__image')
                bigImage.src = image
                bigImage.alt = item.title

                smallImages.appendChild(smallImage)
                bigImages.appendChild(bigImage)
            })

            //set sizes
            item.sizes.map((sizeObj, index) => {
                const sizeElement = document.createElement('span')
                if (sizeObj.isExist === true) {
                    sizeElement.classList.add('item-info__size')
                } else {
                    sizeElement.classList.add('item-info__size-not-exist')
                }
                index || sizeElement.classList.add('selected')
                sizeElement.textContent = sizeObj.size
                sizesContainer.appendChild(sizeElement)
            })

            // set colors
            item.colors.map(color => {
                const colorElement = document.createElement('span')
                colorElement.classList.add('item-info__size')
                colorElement.textContent = color.title
                // colorElement.style.background = color.hex
                colorsContainer.appendChild(colorElement)
            })

            //set details

            item.details.map(detail => {
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



