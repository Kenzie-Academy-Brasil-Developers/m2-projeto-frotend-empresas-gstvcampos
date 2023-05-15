import { readAll } from "./requests.js"
import { allDepartmentsRequest, allEmployeesRequest, departmentsID } from "./adminRequests.js"

//renderizar todas as empresas no select
export async function renderSelect() {
    const select = document.querySelector('.select__button')
    const campanies = await readAll()
    const departments = await allDepartmentsRequest()
    const users = await allEmployeesRequest()

    //renderizar as opções no SELECIONAR EMPRESA
    campanies.forEach(company => {
        const option = document.createElement('option')
        option.innerText = company.name
        option.value = company.id


        select.appendChild(option)
    })

    //rendezirar todos os departamentos logo que abre a pagina
    renderDepartments(departments)
    renderUsers(users)

    select.addEventListener('change', async () => {
        const value = select.value
        const filteredUsers = {}
        if (value == '') {
            renderDepartments(departments)
            renderUsers(users)
        } else {
            renderDepartments(await departmentsID(value))

            users.forEach(user => {
                if(user.company_id == value) {
                    filteredUsers.push(user)
                }
            });

            renderUsers(filteredUsers)
        }
    }) 
}

//renderizar departamentos
export async function renderDepartments(array) {
    const departments = document.querySelector('.ul__departments')
    const campanies = await readAll()
    departments.innerHTML = ''

    array.forEach(element => {

        const li = document.createElement('li')
        const department = document.createElement('h3')
        const description = document.createElement('p')
        const name = document.createElement('p')
        const lookButton = document.createElement('button')
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')
        const lookImg = document.createElement('img')
        const editImg = document.createElement('img')
        const deleteImg = document.createElement('img')

        li.classList.add('li__dep')
        lookButton.classList.add('dep__look')
        editButton.classList.add('dep__edit')
        deleteButton.classList.add('dep__delete')

        campanies.forEach(company => {
            if(company.id == element.company_id) {
                name.innerText = company.name
            }
        });

        lookButton.value = element.id
        editButton.value = element.id
        deleteButton.value = element.id

        department.innerText = element.name
        description.innerText = element.description

        lookImg.src = "../assets/eyes.svg"
        editImg.src = "../assets/edit.svg"
        deleteImg.src = "../assets/trash.svg"

        li.append(department, description, name, lookButton, editButton, deleteButton)
        lookButton.appendChild(lookImg)
        editButton.appendChild(editImg)
        deleteButton.appendChild(deleteImg)
        departments.appendChild(li)
    });
}

//renderizar usuarios
export async function renderUsers(array) {
    const users = document.querySelector('.ul__user')
    const campanies = await readAll()
    users.innerHTML = ''

    array.forEach(element => {

        const li = document.createElement('li')
        const name = document.createElement('h3')
        const company = document.createElement('p')

        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        const editImg = document.createElement('img')
        const deleteImg = document.createElement('img')

        li.classList.add('li__user')
        editButton.classList.add('user__edit')
        deleteButton.classList.add('user__trash')

        const id = element.company_id

        name.innerText = element.name

        //colocar o nome da empresa ou sem empresa
        campanies.forEach(companyy => {
            if(companyy.id == id) {
                company.innerText = companyy.name
            } else {
                company.innerText = 'Sem empresa'
            }
        });
        
        editImg.src = "../assets/edit.svg"
        deleteImg.src = "../assets/trash.svg"

        li.append(name, company, editButton, deleteButton)
        editButton.appendChild(editImg)
        deleteButton.appendChild(deleteImg)
        users.appendChild(li)
    });
}