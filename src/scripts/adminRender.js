import { readAll } from "./requests.js"
import { handleLookDepartment, handleEditDepartment, handleDeleteDepartment, handleEditUser, handleDeleteUser } from "./admin.js"
import { allDepartmentsRequest, allEmployeesRequest, departmentsID, outOfWorkRequest, dismissEmployee} from "./adminRequests.js"

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
        const filteredUsers = []

        if (value == '') {
            renderDepartments(departments)
            renderUsers(users)
        } else {
            users.forEach(user => {
                if (user.company_id == value) {
                    filteredUsers.push(user)
                }
            })

            renderDepartments(await departmentsID(value))
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

        //colocar o nome da empresa
        const comanyName = campanies.find(company => company.id == element.company_id)
        name.innerText = comanyName.name

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

    handleLookDepartment()
    handleEditDepartment()
    handleDeleteDepartment()
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

        editImg.src = "../assets/edit.svg"
        deleteImg.src = "../assets/trash.svg"

        deleteButton.value = element.id
        editButton.value = element.id
        name.innerText = element.name

        const id = element.company_id

        //colocar o nome da empresa ou sem empresa
        const comanyName = campanies.find(company => company.id == id)
        if (comanyName) {
            company.innerText = comanyName.name
        } else {
            company.innerText = 'Sem empresa'
        }

        li.append(name, company, editButton, deleteButton)
        editButton.appendChild(editImg)
        deleteButton.appendChild(deleteImg)
        users.appendChild(li)
    })
    handleEditUser()
    handleDeleteUser()
}

//renderizar todos os usuarios daquele departamento
export async function renderEmployes(departmentId) {
    const allEmployees = await allEmployeesRequest()
    const companies = await readAll()
    const lista = document.querySelector('.depart__employees')
    lista.innerHTML = ''

    allEmployees.forEach(employe => {
        if (employe.department_id == departmentId) {
            const li = document.createElement('li')
            const name = document.createElement('p')
            const company = document.createElement('p')
            const dismissButton = document.createElement('button')

            name.classList.add('user__name')
            company.classList.add('campany__name')
            dismissButton.classList.add('dismiss__button')

            name.innerText = employe.name
            dismissButton.value = employe.id
            dismissButton.innerText = 'Desligar'

            //colocar o nome da empresa
            const companyObject = companies.find(company => company.id == employe.company_id)
            company.innerText = companyObject.name

            lista.appendChild(li)
            li.append(name, company, dismissButton)
        }
    })

    const dismissButtons = document.querySelectorAll('.dismiss__button')
    //requeste para demitir aquele funcionario
    dismissButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const employeId = button.value

            await dismissEmployee(employeId)
            await renderEmployes(departmentId)
            await renderSelectOutWork()
            renderSelect()
        })
    })
}

export async function renderSelectOutWork() {
    const select = document.querySelector('.select__user')
    const employeesOutWorK = await outOfWorkRequest()
    const optionOne = document.createElement('option')
    optionOne.innerText = 'Selecionar usuários'
    optionOne.value = ''

    select.innerHTML = ''
    select.appendChild(optionOne)

    //renderizar o select dos usuarios desempregados
    employeesOutWorK.forEach(employe => {
        const option = document.createElement('option')
        option.innerText = employe.name
        option.value = employe.id

        select.appendChild(option)
    })
}
