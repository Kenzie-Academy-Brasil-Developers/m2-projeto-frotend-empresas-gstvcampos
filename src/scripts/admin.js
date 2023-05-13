import { readAll, allEmployeesRequest } from "./requests.js"

// sair da pagina e limpar localStorage
function handleLogout() {
    const logout = document.querySelector('.logout')

    logout.addEventListener('click', () => {
        localStorage.removeItem('@doit:authToken');
        localStorage.removeItem('@doit:isAdm');
        location.replace('../../index.html')
    })
}

//renderizar todas as empresas no select
async function renderSelect() {
    const select = document.querySelector('.select__button')
    const companies = await readAll()

    companies.forEach(company => {
        const option = document.createElement('option')
        option.innerText = company.name
        option.id = company.id

        select.appendChild(option)
    });
}

//renderizar departamentos
function renderDepartments(array) {
    // const departments = document.querySelector('.ul__departments')

    array.forEach(element => {

        // departments.insertAdjacentHTML(
        //     "beforeend",
        //     `
        //     <li class="li__dep">
        //         <h3>${element}</h3>
        //         <p>${element.description}</p>
        //         <p>${element.name}</p>
        //         <button class="dep__look"><img src="../assets/eyes.svg" alt=""></button>
        //         <button class="dep__edit"><img src="../assets/edit.svg" alt=""></button>
        //         <button class="dep__delete"><img src="../assets/trash.svg" alt=""></button>
        //     </li>
        //     `
        // )
        console.log(element)

        
        // option.value = element.name
        // option.innerText = element.name

        // select.appendChild(option)
    });
}

//renderizar usuarios
function renderUsers() {
    const users = document.querySelector('.ul__user')

    array.forEach(element => {

        departments.insertAdjacentHTML(
            "beforeend",
            `
            <li class="li__user">
                <h3>${element.name}</h3>
                <p>${element}</p>
                <button class="user__edit"><img src="../assets/edit.svg" alt=""></button>
                <button class="user__trash"><img src="../assets/trash.svg" alt=""></button>
            </li>
            `
        )


        
        option.value = element.name
        option.innerText = element.name

        select.appendChild(option)
    });
}

await allEmployeesRequest()

renderSelect()
handleLogout()
