import { Validator } from './validator.js'
import { Storage } from './storage.js'
import { User } from './user.js'

const firstNameSignUp = document.querySelector('#first-name-sign-up')
const lastNameSignUp = document.querySelector('#last-name-sign-up')
const emailSignUp = document.querySelector('#email-sign-up')
const passwordSignUp = document.querySelector('#password-sign-up')
const accountNumberSignUp = document.querySelector('#account-number-sign-up')
const accountTypeSignUp = document.querySelector('#account-type-sign-up')
const accountBalanceSignUp = document.querySelector('#account-balance-sign-up')
const btnSignUp = document.querySelector('#btn-sign-up')
const firstNameSignUpDiv = document.querySelector(`#first-name-sign-up-div`)
const lastNameSignUpDiv = document.querySelector(`#last-name-sign-up-div`)
const emailSignUpDiv = document.querySelector(`#email-sign-up-div`)
const passwordSignUpDiv = document.querySelector(`#password-sign-up-div`)
const accountNumberSignUpDiv = document.querySelector(
  `#account-number-sign-up-div`
)
const accountTypeSignUpDiv = document.querySelector(`#account-type-sign-up-div`)
const accountBalanceSignUpDiv =
  document.querySelector(`#account-balance-sign-up-div
    `)

// Prvo, ukloni sve prethodne greške
btnSignUp.addEventListener('click', (event) => {
  event.preventDefault() // Sprečava slanje forme

  // Prvo, ukloni sve prethodne greške
  const errorDivs = [
    firstNameSignUpDiv,
    lastNameSignUpDiv,
    emailSignUpDiv,
    passwordSignUpDiv,
    accountNumberSignUpDiv,
    accountTypeSignUpDiv,
    accountBalanceSignUpDiv,
  ]

  errorDivs.forEach((div) => {
    // Brisanje svih 'p' tagova sa greškama unutar svakog div-a
    const errorMessages = div.querySelectorAll('p')
    errorMessages.forEach((msg) => msg.remove())
  })

  const firstNameSignUpValue = firstNameSignUp.value.trim()
  const lastNameSignUpValue = lastNameSignUp.value.trim()
  const emailSignUpValue = emailSignUp.value.trim()
  const passwordSignUpValue = passwordSignUp.value.trim()
  const accountNumberSignUpValue = accountNumberSignUp.value.trim()
  const accountTypeSignUpValue = accountTypeSignUp.value.trim()
  const accountBalanceSignUpValue = accountBalanceSignUp.value.trim()
  let errorMessage = ''

  // Validacija First Name
  if (!Validator.validateFirstName(firstNameSignUpValue)) {
    errorMessage = document.createElement('p')
    errorMessage.innerHTML = `<span class="error-message">First name must be a non-empty string!</span>`
    firstNameSignUpDiv.appendChild(errorMessage)
  }

  // Validacija Last Name
  if (!Validator.validateLastName(lastNameSignUpValue)) {
    errorMessage = document.createElement('p')
    errorMessage.innerHTML = `<span class="error-message">Last name must be a non-empty string!</span>`
    lastNameSignUpDiv.appendChild(errorMessage)
  }

  // Validacija Account Number
  if (!Validator.validateAccountNumber(accountNumberSignUpValue)) {
    errorMessage = document.createElement('p')
    errorMessage.innerHTML = `<span class="error-message">Invalid account number</span>`
    accountNumberSignUpDiv.appendChild(errorMessage)
  }

  // Validacija Balance
  if (!Validator.validateBalance(accountBalanceSignUpValue)) {
    errorMessage = document.createElement('p')
    errorMessage.innerHTML = `<span class="error-message">Invalid balance</span>`
    accountBalanceSignUpDiv.appendChild(errorMessage)
  }

  // Provjera da li je account number jedinstven
  if (!Validator.isAccountNumberUnique(accountNumberSignUpValue)) {
    errorMessage = document.createElement('p')
    errorMessage.innerHTML = `<span class="error-message">Account number already exists</span>`
    accountNumberSignUpDiv.appendChild(errorMessage)
  }

  // Validacija Email-a
  if (!Validator.validateEmail(emailSignUpValue)) {
    errorMessage = document.createElement('p')
    errorMessage.innerHTML = `<span class="error-message">Email is not valid or already exists</span>`
    emailSignUpDiv.appendChild(errorMessage)
  }

  // Validacija Password-a (8 karaktera)
  if (!Validator.validatePassword(passwordSignUpValue)) {
    errorMessage = document.createElement('p')
    errorMessage.innerHTML = `<span class="error-message">Password must be at least 8 characters long!</span>`
    passwordSignUpDiv.appendChild(errorMessage)
  }

  // Ako su svi podaci validirani
  if (
    Validator.validateFirstName(firstNameSignUpValue) &&
    Validator.validateLastName(lastNameSignUpValue) &&
    Validator.validateEmail(emailSignUpValue) &&
    Validator.validatePassword(passwordSignUpValue) &&
    Validator.validateAccountNumber(accountNumberSignUpValue) &&
    Validator.validateBalance(accountBalanceSignUpValue) &&
    Validator.isAccountNumberUnique(accountNumberSignUpValue)
  ) {
    // Kreirajte objekat sa svim podacima
    const newUser = new User(
      firstNameSignUpValue,
      lastNameSignUpValue,
      accountNumberSignUpValue,
      accountTypeSignUpValue,
      accountBalanceSignUpValue,
      emailSignUpValue,
      passwordSignUpValue
    )

    firstNameSignUp.value = ''
    lastNameSignUp.value = ''
    emailSignUp.value = ''
    passwordSignUp.value = ''
    accountNumberSignUp.value = ''
    accountTypeSignUp.value = ''
    accountBalanceSignUp.value = ''

    Storage.saveUserAccount(newUser)

    alert('Uspjesna registracija')
  }
})
