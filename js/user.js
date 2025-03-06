import { Validator } from './validator.js'

export class User {
  firstName
  lastName
  accountNumber
  accountType
  accountBalance
  email
  password
  transactionHistory
  isActiv

  constructor(
    firstName,
    lastName,
    accountNumber,
    accountType,
    accountBalance,
    email,
    password
  ) {
    ;(this.firstName = firstName),
      (this.lastName = lastName),
      (this.accountNumber = accountNumber),
      (this.accountType = accountType),
      (this.accountBalance = accountBalance),
      (this.email = email),
      (this.password = password)
    this.isActiv = true
    this.transactionHistory = []
  }

  deposit(amount) {
    if (amount > 0) {
      this.accountBalance += amount
    } else {
      console.log('Deposit amount must be positive.')
    }
  }

  withdraw(amount) {
    if (amount > 0 && this.hasSufficientBalance(amount)) {
      this.accountBalance -= amount
    } else {
      console.log('Insufficient funds or invalid amount.')
    }
  }

  hasSufficientBalance(amount) {
    try {
      if (this.accountBalance >= amount) {
        return true
      } else {
        throw new Error('Insufficient funds for this transaction.')
      }
    } catch (error) {
      console.error('Error:', error.message)
      return false
    }
  }
}
