// dashboard.js
import { User } from './user.js'

const currentUserData = JSON.parse(localStorage.getItem('currentUser'))
const currentUser = new User(
  currentUserData.firstName,
  currentUserData.lastName,
  currentUserData.accountNumber,
  currentUserData.accountType,
  Number(currentUserData.accountBalance),
  currentUserData.email,
  currentUserData.password
)
const depositBtn = document.querySelector('#deposit-btn')
const depositAmount = document.querySelector('#deposit-amount')
const withdrawtBtn = document.querySelector('#withdraw-btn')
const withdrawAmount = document.querySelector('#withdraw-amount')

window.onload = function () {
  // Učitaj korisničke podatke iz localStorage

  if (currentUser) {
    document.querySelector(
      '#user-name'
    ).textContent = `Welcome, ${currentUser.firstName}`
    document.querySelector(
      '#user-balance'
    ).textContent = `Balance: ${currentUser.accountBalance}$`
    document.querySelector(
      '#account-number'
    ).textContent = `Account Number: ${currentUser.accountNumber}`
  } else {
    // Ako nema podataka u localStorage, redirektuj korisnika na login stranicu
    window.location.href = 'login.html'
  }
}

depositBtn.addEventListener('click', (event) => {
  event.preventDefault()
  let depositAmountValue = parseFloat(depositAmount.value) // Konvertuj string u broj
  if (!isNaN(depositAmountValue) && depositAmountValue > 0) {
    currentUser.deposit(depositAmountValue)
    localStorage.setItem('currentUser', JSON.stringify(currentUser)) // Sačuvaj novi balans
    document.querySelector(
      '#user-balance'
    ).textContent = `Balance: ${currentUser.accountBalance}$`
    depositAmount.value = ''
  } else {
    alert('Invalid deposit amount')
  }
})

withdrawtBtn.addEventListener('click', (event) => {
  event.preventDefault()
  let withdrawAmountValue = parseFloat(withdrawAmount.value) // Konvertuj string u broj
  if (!isNaN(withdrawAmountValue) && withdrawAmountValue > 0) {
    currentUser.withdraw(withdrawAmountValue)
    localStorage.setItem('currentUser', JSON.stringify(currentUser)) // Sačuvaj novi balans
    document.querySelector(
      '#user-balance'
    ).textContent = `Balance: ${currentUser.accountBalance}$`
    withdrawAmount.value = ''
  } else {
    alert('Invalid deposit amount')
  }
})
