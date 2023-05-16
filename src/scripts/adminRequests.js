import { toast, red, green } from "./toast.js"

const baseUrl = 'http://localhost:3333'

// -----------------------------
// --------- EMPLOYEE ----------
// -----------------------------

//GET Rota responsável por listar todos os funcionários cadastrados
export async function allEmployeesRequest() {
    const employees = await fetch(`${baseUrl}/employees/readAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        },
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })

    return employees
}

//GET Rota responsável por listar todos os funcionários sem nenhum departamento
export async function outOfWorkRequest() {
    const departments = await fetch(`${baseUrl}/employees/outOfWork`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        },
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })

    return departments
}

//PATCH Rota responsável por atualizar as informações de um funcionário
export async function updateEmployee(id, attBody) {
    const employee = await fetch(`${baseUrl}/employees/updateEmployee/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        },
        body: JSON.stringify(attBody)
    })

    .then(async (res) => {
        if(res.ok) {
            const response = await res.json()
            return toast(green, response.message)
        } else {
            const response = await res.json()
            return toast(red, response.message)
        }
    })

    return employee
}

//DELETE Rota responsável por deletar um usuário
export async function deleteEmployee(id) {
    const employee = await fetch(`${baseUrl}/employees/deleteEmployee/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        }
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })
    .catch((error) => {
        console.log(error.message)
    })

    return employee
}

//PATCH Rota responsável por contratar um funcionário para um departamento
export async function hireEmployee(id, hireBody) {
    const employee = await fetch(`${baseUrl}/employees/hireEmployee/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        },
        body: JSON.stringify(hireBody)
    })

    .then(async (res) => {
        if(res.ok) {
            const response = await res.json()
            return toast(green, response.message)
        } else {
            const response = await res.json()
            return toast(red, response.message)
        }
    })

    return employee
}

//PATCH Rota responsável por demitir um funcionário de um departamento
export async function dismissEmployee(id) {
    const employee = await fetch(`${baseUrl}/employees/dismissEmployee/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        }
    })

    .then(async (res) => {
        if(res.ok) {
            const response = await res.json()
            return toast(green, response.message)
        } else {
            const response = await res.json()
            return toast(red, response.message)
        }
    })

    return employee
}

// -----------------------------
// -------- DEPARTMENT ---------
// -----------------------------

//GET Rota responsável por listar todos os departamentos de uma empresa
export async function departmentsID(id) {
    const department = await fetch(`${baseUrl}/departments/readByCompany/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        },
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })
    return department
}

//GET Rota responsável por listar todos os departamentos cadastrados
export async function allDepartmentsRequest() {
    const departments = await fetch(`${baseUrl}/departments/readAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        }
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })


    return departments
}

//POST Rota responsável por cadastrar um novo departamento
export async function createDepartment(createBody) {
    const department = await fetch(`${baseUrl}/departments/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        },
        body: JSON.stringify(createBody),
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            toast(red, response.message)
        }
    })

    return department
}

//PATCH Rota responsável por atualizar a descrição de um departamento
export async function updateDepartment(id, attBody) {
    const department = await fetch(`${baseUrl}/departments/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        },
        body: JSON.stringify(attBody)
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })

    return department
}

//DELETE Rota responsável por deletar um departamento
export async function deleteDepartment(id) {
    const department = await fetch(`${baseUrl}/departments/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
        }
    })

    .then(async (res) => {
        if(res.ok) {
            return res.json()
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })

    return department
}