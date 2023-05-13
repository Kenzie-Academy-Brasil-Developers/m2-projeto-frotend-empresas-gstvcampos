import { toast } from "./toast.js"

const baseUrl = 'http://localhost:3333'
const requestHeaders = {
    'Content-Type': 'application/json',
}

export const red = '#df1545'
export const green = '#168821'

//GET buscar todas as categorias das empresas cadastradas
export async function categoriesRequest() {
    const categories = await fetch(`${baseUrl}/categories/readAll`, {
        method: 'GET',
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            //toast(red, reponseJson.message)
        }
    })

    return categories
}

//GET para retornar todas as empresas
export async function readAll() {
    const allCompanies = await fetch(`${baseUrl}/companies/readAll`, {
        method: 'GET',
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = res.json
            console.log(response)
        }
    })

    return allCompanies
}

//GET filtrar empresas pela categoria
export async function readByCategory(category) {
    const FilteredCategory = await fetch(`${baseUrl}/companies/readByCategory/${category}`, {
        method: 'GET',
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = res.json
        }
    })

    return FilteredCategory
}

//POST realizar o login 
export async function loginRequest(loginBody) {
    const tokenRequest = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })

    .then( async (res) => {
        if(res.ok) {
            const responseJson = await res.json()
            const {authToken, isAdm} = responseJson

            localStorage.setItem('@doit:authToken', JSON.stringify(authToken))
            localStorage.setItem('@doit:isAdm', JSON.stringify(isAdm))

            toast(green, 'Login realizado com sucesso')

            if(isAdm){
                setTimeout(() => {
                    location.replace('./admin.html')
                }, 2000)
            } else {
                setTimeout(() => {
                    location.replace('./user.html')
                }, 2000)
            }
        } else {
            const responseJson = await res.json()

            toast(red, responseJson.message)
        }
    })
    
    return tokenRequest
}

//POST cadastrar novo usuario
export async function registerRequest(registerBody) {
    const register = await fetch(`${baseUrl}/employees/create`, {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify(registerBody)
    })

    .then(async (res) => {
        if(res.ok) {
            toast(green, 'Cadastro realizado com sucesso')

            setTimeout(() => {
                location.replace('./login.html')
            }, 2000)

        } else {
            const responseJson = await res.json()

            toast(red, responseJson.message)
        }
    })

    return register
}

//-------------------------
//------ADMIN REQUEST------
//-------------------------

const token = localStorage.getItem('@doit:authToken') || ""
const adminHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
}

//GET buscar todos os departamentos
export async function allDepartmentsRequest() {
    const departments = fetch(`${baseUrl}/departments/readAll`, {
        method: 'GET',
        headers: adminHeaders,
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = res.json
            console.log(response)
        }
    })

    return departments
}

//GET departamentos pelo ID
export async function departmentsID(id) {
    const department = fetch(`${baseUrl}/departments/readByCompany/${id}`, {
        method: 'GET',
        headers: adminHeaders
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = res.json
            console.log(response)
        }
    })

    return department
}

//GET buscar todos os empregados
export async function allEmployeesRequest() {
    const employees = fetch(`${baseUrl}/employees/readAll`, {
        method: 'GET',
        headers: adminHeaders
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = res.json
            console.log(response)
        }
    })

    return employees
}

