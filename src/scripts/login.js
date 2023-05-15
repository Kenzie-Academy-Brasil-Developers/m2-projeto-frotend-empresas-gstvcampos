import { toast, red, green } from "./toast.js" 
import { loginRequest } from './requests.js'

// mudar de pagina
function handlePage() {
    const homeBtn = document.querySelector('.home')
    const registerBtn = document.querySelectorAll('.register')

    homeBtn.addEventListener('click', () => {
        location.replace('../../index.html')
    })

    registerBtn.forEach(button => {
        button.addEventListener('click', () => {
            location.replace('./register.html')
        })
    });
}

//realizar login
function handleLogin() {
    const inputs = document.querySelectorAll('.login__input')
    const button = document.querySelector('.login__button')
    let loginBody = {}
    let count = 0

    button.addEventListener('click', async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            if(input.value.trim() === '') {
                count++
            }

            loginBody[input.name] = input.value
        })

        if(count !==0) {
            count =0
            return toast(red, 'Por favor preencha todos os campos')
        } else {
            const token = await loginRequest(loginBody)
        }
    })
}

handlePage()
handleLogin()
