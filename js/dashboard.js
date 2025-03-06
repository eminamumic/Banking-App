// dashboard.js
import { User } from './user.js'
import { Storage } from './storage.js'
import { Validator } from './validator.js'

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
const logOutBtn = document.querySelector('#log-out-dashboard')
const transferBtn = document.querySelector('#transfer-amount-btn')
const transferToAccount = document.querySelector('#transfer-to-account')
const transferAmount = document.querySelector('#transfer-amount')

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
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    Storage.updateStoredUserAccount(currentUser) // Sačuvaj novi balans
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

  let withdrawAmountValue = parseFloat(withdrawAmount.value)
  if (!isNaN(withdrawAmountValue) && withdrawAmountValue > 0) {
    currentUser.withdraw(withdrawAmountValue)
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    Storage.updateStoredUserAccount(currentUser)
    document.querySelector(
      '#user-balance'
    ).textContent = `Balance: ${currentUser.accountBalance}$`
    withdrawAmount.value = ''
  } else {
    alert('Invalid deposit amount')
  }
})

logOutBtn.addEventListener('click', (event) => {
  event.preventDefault()
  localStorage.removeItem('currentUser')
  window.location.href = 'landing.html'
})

/*transferBtn.addEventListener('click', (event) => {
  event.preventDefault()

  const transferToAccountNumber = transferToAccount.value
  const transferAmountValue = parseFloat(transferAmount.value)

  // Provjera ispravnosti iznosa
  if (isNaN(transferAmountValue) || transferAmountValue <= 0) {
    alert('Invalid transfer amount')
    return
  }

  if (currentUser.transferFunds(transferToAccountNumber, transferAmountValue)) {
    // Ažuriraj podatke trenutnog korisnika u localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    Storage.updateStoredUserAccount(currentUser) // Ažuriraj račun korisnika

    // Pronađi primateljski račun pomoću broja računa
    const toAccount = Validator.findAccountByAccountNumber(
      transferToAccountNumber
    )

    if (toAccount) {
      Storage.updateStoredUserAccount(toAccount) // Ažuriraj račun primatelja
    } else {
      alert('Recipient account not found')
    }

    // Ažuriraj prikaz na dashboardu
    document.querySelector(
      '#user-balance'
    ).textContent = `Balance: ${currentUser.accountBalance}$`
    transferAmount.value = ''
    transferToAccount.value = ''
  }
})
*/
