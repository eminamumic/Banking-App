import { Validator } from './validator.js'
import { Storage } from './storage.js'

const emailLogIn = document.querySelector('#email-log-in')
const emailLogInDiv = document.querySelector('#email-log-in-div')
const passwordLogIn = document.querySelector('#password-log-in')
const passwordLogInDiv = document.querySelector('#password-log-in-div')
const btnLogIn = document.querySelector('#btn-log-in')

btnLogIn.addEventListener('click', (event) => {
  event.preventDefault()

  const errorDivs = [emailLogInDiv, passwordLogInDiv]

  errorDivs.forEach((div) => {
    // Brisanje svih 'p' tagova sa greškama unutar svakog div-a
    const errorMessages = div.querySelectorAll('p')
    errorMessages.forEach((msg) => msg.remove())
  })

  let emailLogInValue = emailLogIn.value.trim()
  let passwordLogInValue = passwordLogIn.value.trim()
  let errorMessage = ''

  let account = Validator.findAccountByEmail(emailLogInValue)
  if (!account) {
    errorMessage = document.createElement('p')
    errorMessage.innerHTML = `<span class="error-message">Email is not corect</span>`
    emailLogInDiv.appendChild(errorMessage)
  }

  if (account.password !== passwordLogInValue) {
    errorMessage = document.createElement('p')
    errorMessage.innerHTML = `<span class="error-message">Password is not corect</span>`
    passwordLogInDiv.appendChild(errorMessage)
  }

  emailLogIn.value = ''
  passwordLogIn.value = ''

  if (account && account.password === passwordLogInValue) {
    Storage.saveCurrentUserAccount(account)

    // Preusmeravanje na dashboard.html
    window.location.href = 'dashboard.html'
  }
})
