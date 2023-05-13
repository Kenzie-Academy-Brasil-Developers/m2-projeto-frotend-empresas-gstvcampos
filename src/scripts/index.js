import { categoriesRequest, readByCategory, readAll } from "./requests.js"

// mudar de pagina
function handlePage() {
    const loginBtn = document.querySelector('.login')
    const registerBtn = document.querySelector('.register')

    loginBtn.addEventListener('click', () => {
        location.replace('./src/pages/login.html')
    })

    registerBtn.addEventListener('click', () => {
        location.replace('./src/pages/register.html')
    })
}

// renderizar os categorias em opção
function renderSelection(array) {
    const select = document.querySelector('.select__button')

    array.forEach(element => {
        const option = document.createElement('option')
        option.value = element.name
        option.innerText = element.name

        select.appendChild(option)
    });
}

//renderizar as empresas selecionada
function renderCompanies(array) {
    const ul = document.querySelector('ul')
    ul.innerHTML = ''

    array.forEach(element => {
        const li = document.createElement('li')
        const p = document.createElement('p')
        const btn = document.createElement('button')

        p.innerText = element.name
        btn.innerText = element.description
        li.append(p, btn)
        ul.appendChild(li)
    })
}

// // filtar as empresas por categoria
async function handleSelect() {
    const select = document.querySelector('.select__button')  

    select.addEventListener('change', async () => {
        const value = select.value
        if (value == '') {
            renderCompanies(await readAll())
        } else {
            renderCompanies(await readByCategory(value))
        }
    }) 
}

handlePage()
renderSelection(await categoriesRequest())
renderCompanies(await readAll())
handleSelect()



