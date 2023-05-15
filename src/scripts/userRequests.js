import { toast, red, green } from "./toast.js"
//-------------------------
//------USER REQUEST------
//-------------------------
const baseUrl = 'http://localhost:3333'
const token = JSON.parse(localStorage.getItem("authToken"))
const userHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
}

// -----------------------------
// --------- EMPLOYEE ----------
// -----------------------------

//GET Rota responsável para listar as informações do usuário logado
export async function profileRequest() {
    const user = await fetch(`${baseUrl}/employees/profile`, {
        method: 'GET',
        headers: userHeaders,
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })

    return user
}

//GET Rota responsável por listar uma empresa a partir do id informado
export async function companyRequest(company_id) {
    const user = await fetch(`${baseUrl}/companies/readById/${company_id}`, {
        method: 'GET',
        headers: userHeaders,
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })

    return user
}

//GET Rota responsável por listar um departamento a partir do id informado
export async function departmentRequest(department_id) {
    const user = await fetch(`${baseUrl}/departments/readById/${department_id}`, {
        method: 'GET',
        headers: userHeaders,
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })

    return user
}