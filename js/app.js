const mainBottom = document.querySelector('.main__bottom')
const formEl = document.querySelector('form')
const overlay = document.querySelector('#overlay')

let API = "https://api.unsplash.com/photos/?client_id=rGJArh12bQQcLUtu8j6sOklE9LV0IKG2vm-afpbOPGU"
let searchAPI = "https://api.unsplash.com/search/photos?client_id=rGJArh12bQQcLUtu8j6sOklE9LV0IKG2vm-afpbOPGU&page=1&query="

function getData(resource) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                resolve(JSON.parse(request.responseText))

            } else if (request.readyState === 4) {
                overlay.classList.remove('hidden')
                reject("No data")
            }
        })
        request.open('get', resource)
        request.send()
    })
}

getData(API).then((data) => {
    post(data)
}).catch(() => {
    console.log(err);
})

function sendSearch(API) {
    getData(API).then((data) => {
        post(data.results)
    }).catch(() => {
        console.log(err);
    })
}


function post(array) {
    mainBottom.innerHTML = ""
    array.forEach(element => {
        let imgSrc = element.urls.small
        let imgLikes = element.likes
        let user = element.user.name
        let userPhoto = element.user.profile_image.medium
        let userLink = element.user.links.html

        mainBottom.innerHTML += `
        <div class="img_div">
            <img src="${imgSrc}">
            <div class="img_info">
                <div>
                    <a href="${userLink}">
                        <h3>${user}</h3>
                    </a>
                    <p>${imgLikes} likes</p>
                </div>
                <a href="${userLink}"><img src="${userPhoto}"></a>
            </div>
        </div>
        `
    });
    overlay.classList.add('hidden')
}

formEl.addEventListener('submit', (e) => {
    overlay.classList.remove('hidden')
    e.preventDefault()

    let searchText = formEl.inp.value.toLowerCase();

    sendSearch(searchAPI + searchText)

    formEl.reset();

})