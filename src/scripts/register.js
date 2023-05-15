import { toast, red , green } from "./toast.js"
import { registerRequest } from './requests.js'

// mudar de pagina
function handlePage() {
    const HomeButtons = document.querySelectorAll('.home')
    const registerButton = document.querySelector('.login')

    HomeButtons.forEach((button) => {
        button.addEventListener('click', () => {

            location.replace('../../index.html')
        });
    });

    registerButton.addEventListener('click', () => {
        location.replace('./login.html')
    })
}

//fazer o cadastro do usuario
function handleRegister() {
    const inputs = document.querySelectorAll('.register__input')
    const button = document.querySelector('.submit__button')
    let registerBody = {}
    let count = 0

    button.addEventListener('click', async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            if(input.value.trim() === '') {
                count++
            }

            registerBody[input.name] = input.value
        })

        if(count !== 0) {
            count =0
            return toast(red, 'Por favor preencha todos os campos')
        } else {
            await registerRequest(registerBody)
        }
    })
}

handlePage()
handleRegister()