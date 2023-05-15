import { toast, red, green } from "./toast.js"

import { readAll } from "./requests.js"
import { allEmployeesRequest, allDepartmentsRequest } from "./adminRequests.js"
import { renderSelect, renderDepartments, renderUsers } from "./adminRender.js"

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
    const look = document.querySelector('.dialog__look')
    const editUser = document.querySelector('.dialog__edit--user')
    const deleteUser = document.querySelector('.dialog__delete')
    const create = document.querySelector('.dialog__create')
    const editDep = document.querySelector('.dialog__edit--dep')
    const deleteDep = document.querySelector('.dialog__delete')

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
                console.log(createBody)

                await createDepartment(createBody)
                //função cadastrar
            }
        })

        closeModal()
    })
}

//Abrir modal para ver o departamento e contratar
function handleLook() {
    const modal = document.querySelector('.dialog__look')
    const buttons = document.querySelectorAll('.dep__look')

    // const users = ///função pegar array de usuarios (outOfWork)
    //const select = document.querySelector('.select__user')

    console.log('aaaa')

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            modal.showModal()

            //renderizar os usuarios 
            // users.forEach(user => {
            //     const option = document.createElement('option')
            //     option.value = element.user.id
            //     option.innerText = user.name

            //     select.appendChild(option)
            // })




            closeModal()
        });

    })
}



handleLogout()
//renderizar opções no select e renderizar departamentos e usuarios na tela
renderSelect()

handleCreate()
handleLook()

