import { toast, red, green } from "./toast.js"

import { readAll } from "./requests.js"
import { allEmployeesRequest, allDepartmentsRequest, updateDepartment, createDepartment, deleteDepartment, outOfWorkRequest, updateEmployee, hireEmployee, dismissEmployee, deleteEmployee } from "./adminRequests.js"
import { renderSelect, renderDepartments, renderUsers } from "./adminRender.js"

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

//fechar Madais
function closeModal() {
    const closeButtons = document.querySelectorAll(".close__button")
    const create = document.querySelector('.dialog__create')
    const look = document.querySelector('.dialog__look')
    const editUser = document.querySelector('.dialog__edit--user')
    const editDep = document.querySelector('.dialog__edit--dep')
    const deleteUser = document.querySelector('.modal__delete--user')
    const deleteDep = document.querySelector('.modal__delete--dep')

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            look.close()
            editUser.close()
            deleteUser.close()
            create.close()
            editDep.close()
            deleteDep.close()
        });
    });
}

//Abrir modal para criar departamento
async function handleCreate() {
    const modal = document.querySelector('.dialog__create')
    const button = document.querySelector('.create')
    const select = document.querySelector('.select__company')

    const campanies = await readAll()

    //renderizar os departamentos no select
    campanies.forEach(company => {
        const option = document.createElement('option')
        option.value = company.id
        option.innerText = company.name

        select.appendChild(option)
    })

    let createBody = {}
    let count = 0

    select.addEventListener('change', () => {
        const value = select.value
        
        if (value == '') {
            count++
        } else {
            createBody[select.name] = value
        }
    })

    button.addEventListener('click', () => {
        modal.showModal()

        const inputs = document.querySelectorAll('.create__input')
        const Createbutton = document.querySelector('.create__button')

        Createbutton.addEventListener('click', async () => {


            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    count++
                }

                createBody[input.name] = input.value
            });

            if (count !== 0) {
                count = 0
                return toast(red, 'Por favor preencha todos os campos')
            } else {
                await createDepartment(createBody)
                modal.close()
                toast(green, 'Departamento criado com sucesso')
                renderSelect()
            }
        })
        closeModal()
    })
}

//Abrir modal para ver o departamento e contratar
export async function handleLookDepartment() {
    const modal = document.querySelector('.dialog__look')
    const buttons = document.querySelectorAll('.dep__look')
    const departments = await allDepartmentsRequest() // todos os departamentos
    const companies = await readAll() // todas as empresas, verificar com id
    const allEmployees = await allEmployeesRequest() // listar todos
    const employeesOutWorK = await outOfWorkRequest() // todos desempregados
    const select = document.querySelector('.select__user')
    const lista = document.querySelector('.depart__employees')
    const hireButton = document.querySelector('.hire__button')
    const departmentName = document.querySelector('.depart__name')
    const departmentDescription = document.querySelector('.depart__description')
    const Departmentcompany = document.querySelector('.owned__company')

    //renderizar o select dos usuarios desempregados
    employeesOutWorK.forEach(employees => {
        const option = document.createElement('option')
        option.innerText = employees.name
        option.value = employees.id

        select.appendChild(option)
    });

    //pegando todos os botoes de olho e adicionando as funções
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            modal.showModal()

           
            //rederizar os nomes no modal
            departments.forEach(depart => {
                if(depart.id == button.value) {
                    departmentName.innerText = depart.name
                    departmentDescription.innerText = depart.description
                }
                companies.forEach(compa => {
                    if(compa.id == depart.company_id) {
                        Departmentcompany.innerText = compa.name
                    }
                })
            })

            //renderizar todos os usuarios daquele setor
            allEmployees.forEach(element => {
                if(element.department_id == button.value) {
                    const li = document.createElement('li')
                    const name = document.createElement('p')
                    const company = document.createElement('p')
                    const dismissButton = document.createElement('button')

                    name.classList.add('user__name')
                    company.classList.add('campany__name')
                    dismissButton.classList.add('dismiss__button')
                    
                    name.innerText = element.name
                    dismissButton.value = element.id
                    dismissButton.innerText = 'Desligar'

                    companies.forEach(comp => {
                        if(element.company_id == comp.id) {
                            company.innerText = comp.name
                        }
                    })

                    lista.appendChild(li)
                    li.append(name, company, dismissButton)

                    //função demitir daquele departamente
                    dismissButton.addEventListener('click', async () => {
                        const employedId = dismissButton.value
                        await dismissEmployee(employedId)
                    })
                }
            })

            const hireBody = {
                "department_id":`${button.value}`
            }
        
            //request contratar para aquele setor
            hireButton.addEventListener('click', async () => {
                const idEmployed = select.value
                    
                if (idEmployed == '') {
                    return toast(red, 'Por favor selecione alguma opção')
                } else {
                    await hireEmployee(idEmployed, hireBody)
                }
            })

            closeModal()
        })

    })
}

//Abrir modal para editar a descrição do departamento
export async function handleEditDepartment() {
    const buttons = document.querySelectorAll('.dep__edit')

    const modal = document.querySelector('.dialog__edit--dep')
    const input = document.querySelector('.edit__department')
    const editButton = document.querySelector('.button__edit--dep')

    const departments = await allDepartmentsRequest()
    
    //pegando todos os botoes de edite e adicionando as funções
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            modal.showModal()
            
            const departmentId = button.value

            //request editar
            editButton.addEventListener('click', async () => {

                let description = input.value

                if(description.trim() === '') {
                    return toast(red, 'Por favor preencha todos os campos')
                }

                let departmentName = ''
                //pegar o nome do departamento
                departments.forEach(depart => {
                    if(depart.id == departmentId) {
                        departmentName = depart.name
                    }
                })

                //body do edit
                const updateBody = {
                    "description":`${description}`,
                    "name": `${departmentName}`
                }

                description = ''                
                await updateDepartment(departmentId, updateBody)
                modal.close()
                toast(green, 'Departamento editado')
                renderSelect()
            })

            closeModal()
        })

    })
}

//abrir modal para deletar o departamento
export async function handleDeleteDepartment() {
    const buttons = document.querySelectorAll('.dep__delete')

    const modal = document.querySelector('.modal__delete--dep')
    const name = document.querySelector('.delete__name--dep')
    const deleteButton = document.querySelector('.button__delete--department')

    const departments = await allDepartmentsRequest()
    
    //pegando todos os botoes de edite e adicionando as funções
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            modal.showModal()
            
            const departmentId = button.value

            //renderizar o nome do departamento
            departments.forEach(depart => {
                if(depart.id == departmentId) {
                    name.innerText = `Realmente deseja remover o ${depart.name} e demitir seus funcionários?`
                }
            });
            
            //request editar
            deleteButton.addEventListener('click', async () => {                    
                await deleteDepartment(departmentId)
                modal.close()
                toast(green, 'Departamento deletado')
                renderSelect()
            })
        })

        closeModal()
    })
}

//Abrir modal para editar a descrição do departamento
export async function handleEditUser() {
    const buttons = document.querySelectorAll('.user__edit')

    const modal = document.querySelector('.dialog__edit--user')
    const inputs = document.querySelectorAll('.edit__user')
    const editButton = document.querySelector('.button__edit--user')
    let editBody = {}
    let count = 0

    //pegando todos os botoes de edite e adicionando as funções
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            modal.showModal()
            
            const employeeId = button.value

            editButton.addEventListener('click', async () => {

                inputs.forEach(input => {
                    if(input.value.trim() === '') {
                        count++
                    }
                    
                    editBody[input.name] = input.value
                })

                if(count !== 0) {
                    count = 0
                    return toast(red, 'Por favor preencha todos os campos')
                }

                await updateEmployee(employeeId, editBody)
                modal.close()
                toast(green, 'Usuario editado')
                renderSelect()
            })

            closeModal()
        })

    })
}

//abrir modal para deletar o usuario
export async function handleDeleteUser() {
    const buttons = document.querySelectorAll('.user__trash')

    const modal = document.querySelector('.modal__delete--user')
    const deleteButton = document.querySelector('.button__delete--user')
    const name = document.querySelector('.delete__name--user')

    const employees = await allEmployeesRequest()
    
    //pegando todos os botoes de edite e adicionando as funções
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            modal.showModal()
            
            const employeeId = button.value
            employees.forEach(emp => {
                if(emp.id == employeeId) {
                    name.innerText = "Realmente deseja remover o usuário "+ emp.name +"?"
                }
                console.log(emp.id)
                console.log(employeeId)
                console.log('----')
            })
            
            //request editar
            deleteButton.addEventListener('click', async () => {                    
                await deleteEmployee(employeeId)
                modal.close()
                toast(green, 'Usuario deletado com sucesso')
                renderSelect()
            })

            closeModal()
        })

    })
}

authentication()
handleLogout()
renderSelect()
handleCreate()
