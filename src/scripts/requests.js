import { toast, red, green } from "./toast.js"

const baseUrl = 'http://localhost:3333'
const requestHeaders = {
    'Content-Type': 'application/json',
}

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

            localStorage.setItem('authToken', JSON.stringify(authToken))

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
        headers: requestHeaders,
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

