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
        div.innerHTML = ''
        div.classList.add('div__company--hired')
        const companyInfo = await companyRequest(companyID)
        const departmentInfo = await departmentRequest(departmentID)

        console.log(departmentInfo)
        const title = document.createElement('h1')
        const titleDiv = document.createElement('div')
        const ul = document.createElement('ul')

        titleDiv.classList.add('div__title')
        title.classList.add('title__company')

        title.innerText = `${companyInfo.name} - ${departmentInfo.name}`

        titleDiv.appendChild(title)

        departmentInfo.employees.forEach(employee => {
            const li = document.createElement('li')
            const employeeName = document.createElement('h2')

            employeeName.classList.add('employee__name')
            employeeName.innerText = employee.name
            li.appendChild(employeeName)
            ul.appendChild(li)
        });

        div.append(titleDiv, ul)
    }
}


authentication()
handleLogout()
renderPage()
