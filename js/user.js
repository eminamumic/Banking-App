import { Transaction } from './transaction.js'
import { Storage } from './storage.js'
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

  /*transferFunds(toAccountNumber, amount) {
    try {
      if (!Validator.validateBalance(amount)) {
        throw new Error('Invalid transaction amount.')
      }

      const toAccount = Validator.findAccountByAccountNumber(toAccountNumber)

      if (!toAccount) {
        throw new Error('The recipient account does not exist.')
      }

      if (this.accountNumber === toAccount.accountNumber) {
        throw new Error('Cannot transfer funds to the same account.')
      }

      if (
        this.accountType !== 'checking' ||
        toAccount.accountType !== 'checking'
      ) {
        throw new Error(
          'Both accounts must be checking accounts for this transaction.'
        )
      }

      if (!this.isActiv || !toAccount.isActiv) {
        throw new Error('One or both accounts are inactive.')
      }

      if (!this.hasSufficientBalance(amount)) {
        throw new Error('Insufficient funds for this transaction.')
      }

      this.accountBalance -= amount
      toAccount.accountBalance += amount

      const transaction = new Transaction(this, toAccount, amount, 'transfer')

      this.transactionHistory.push(transaction)
      toAccount.transactionHistory.push(transaction)

      Storage.updateStoredUserAccount(this)
      Storage.updateStoredUserAccount(toAccount)

      console.log('Transaction successful.')
      return true
    } catch (error) {
      console.error('Transaction failed:', error.message)
      return false
    }
  }*/
}
