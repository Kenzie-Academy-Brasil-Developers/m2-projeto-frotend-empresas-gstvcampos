import { toast, red, green } from "./toast.js"

import { profileRequest, companyRequest, departmentRequest } from "./userRequests.js"

//segurança da pagina de admin
function authentication() {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      location.replace("../../index.html");
    }
}

// sair da pagina e limpar localStorage
function handleLogout() {
    const logout = document.querySelector('.logout')

    logout.addEventListener('click', () => {
        localStorage.removeItem('authToken');

        location.replace('../../index.html')
    })
}

//renderizar nome e email usuario
async function renderPage() {
    const profile = await profileRequest()
    const name = document.querySelector('.username')
    const email = document.querySelector('.user__email')

    name.innerHTML = profile.name
    email.innerHTML = profile.email

    const companyID = profile.company_id
    const departmentID = profile.department_id

    const div = document.querySelector('.div__company')

    if (companyID !== null) {
        const companyInfo = await companyRequest(companyID)
        const departmentInfo = await departmentRequest(departmentID)

        const company = document.createElement('span')
        const department = document.createElement('span')
        const titleDiv = document.createElement('div')
        const ul = document.createElement('ul')

        titleDiv.classList.add('div__title')

        company.innerText = companyInfo.name
        department.innerText = departmentInfo.name

        departmentInfo.employees.forEach(employee => {
            console.log(employee)
        });
    }
}


authentication()
handleLogout()

renderPage()