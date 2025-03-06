import { Storage } from './storage.js'

export class Validator {
  // Ova funkcija provjerava da li je prvo ime validno
  static validateFirstName(firstName) {
    try {
      if (typeof firstName !== 'string' || firstName.trim() === '') {
        throw new Error('First name must be a non-empty string!') // Ako ime nije string ili je prazno
      }
      if (firstName.length < 2) {
        throw new Error('First name must be at least 2 characters long!') // Ako ime ima manje od 2 karaktera
      }
      return true
    } catch (error) {
      console.error('Error:', error.message)
      return false
    }
  }

  // Ova funkcija provjerava da li je prezime validno
  static validateLastName(lastName) {
    try {
      if (typeof lastName !== 'string' || lastName.trim() === '') {
        throw new Error('Last name must be a non-empty string!') // Ako prezime nije string ili je prazno
      }
      if (lastName.length < 2) {
        throw new Error('Last name must be at least 2 characters long!') // Ako prezime ima manje od 2 karaktera
      }
      return true
    } catch (error) {
      console.error('Error:', error.message)
      return false
    }
  }

  static validateEmail(email) {
    try {
      // Provjera da li je email u ispravnom formatu
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format!')
      }

      // Provjera da li email već postoji u localStorage
      const accounts = Storage.getStoredAccounts()
      const emailExists = accounts.some((account) => account.email === email)
      if (emailExists) {
        throw new Error('This email is already registered.')
      }

      return true
    } catch (error) {
      console.error('Error:', error.message)
      return false
    }
  }

  // Ova funkcija provjerava da li lozinka ima najmanje 8 karaktera
  static validatePassword(password) {
    try {
      if (typeof password !== 'string' || password.length < 8) {
        throw new Error('Password must be at least 8 characters long!')
      }
      return true
    } catch (error) {
      console.error('Error:', error.message)
      return false
    }
  }

  // Ova funkcija vraća sve spremljene račune iz localStorage

  // Ova funkcija traži račun prema broju računa
  static findAccountByAccountNumber(accountNumber) {
    try {
      let accounts = Storage.getStoredAccounts()

      // Pronalazak računa u listi
      const foundAccount = accounts.find(
        (accountInAccount) => accountNumber === accountInAccount.accountNumber
      )

      // Ako račun nije pronađen, baciti grešku
      if (!foundAccount) {
        throw new Error('This account does not exist.')
      }

      return foundAccount // Vraćamo pronađeni račun
    } catch (error) {
      console.log('Error:', error.message)
      return null // Ako dođe do greške, vraćamo null
    }
  }

  static findAccountByEmail(email) {
    try {
      const accounts = Storage.getStoredAccounts()
      const foundAccount = accounts.find((account) => account.email === email)

      if (!foundAccount) {
        throw new Error('Account with this email does not exist.')
      }

      return foundAccount
    } catch (error) {
      console.log('Error:', error.message)
      return null
    }
  }

  // Ova funkcija provjerava da li je broj računa jedinstven
  static isAccountNumberUnique(accountNumber) {
    try {
      const accounts = Storage.getStoredAccounts()
      const exists = accounts.some((acc) => acc.accountNumber === accountNumber)

      if (exists) {
        throw new Error('Account number already exists.')
      }

      return true
    } catch (error) {
      console.error('Error:', error.message)
      return false
    }
  }

  // Ova funkcija provjerava da li je broj računa validan (tačno 13 cifara)
  static validateAccountNumber(accountNumber) {
    try {
      if (typeof accountNumber !== 'string') {
        throw new Error('The account number must be in string format.')
      }

      if (!/^\d{13}$/.test(accountNumber)) {
        throw new Error('The account number must consist of exactly 13 digits.')
      }

      return true
    } catch (error) {
      console.error('Error:', error.message)
      return false
    }
  }

  // Ova funkcija provjerava da li je saldo validan
  static validateBalance(balance) {
    try {
      if (typeof balance === 'string') {
        balance = Number(balance)
      }

      if (typeof balance !== 'number' || isNaN(balance)) {
        throw new Error('Balance must be a valid number.')
      }

      if (balance < 0) {
        throw new Error('Balance must be greater than or equal to 0.')
      }

      return true
    } catch (error) {
      console.error('Error:', error.message)
      return false
    }
  }

  // Ova funkcija provjerava da li je saldo na računu dovoljan za transakciju
  static hasSufficientBalance(account, amount) {
    try {
      if (account.balance >= amount) {
        return true
      } else {
        throw new Error('Insufficient funds for this transaction.')
      }
    } catch (error) {
      console.error('Error:', error.message)
      return false
    }
  }

  // Ova funkcija provjerava da li je račun "checking" tipa
  static isAccountChecking(account) {
    try {
      if (account.type.toLowerCase() !== 'checking') {
        throw new Error('Account must be "Checking account" for transaction') // Ako račun nije tipa "checking"
      }
      return true
    } catch (error) {
      console.log(`Error: `, error.message)
      return false
    }
  }

  // Ova funkcija validira transakciju između dva računa
  static transactionValidation(fromAccountNumber, toAccountNumber, amount) {
    try {
      // Dohvatanje računa iz memorije
      const fromAccount = this.findAccount(fromAccountNumber)
      const toAccount = this.findAccount(toAccountNumber)

      // Provjeriti da li oba računa postoje
      if (!fromAccount || !toAccount) {
        throw new Error('One or both accounts do not exist.')
      }

      // Provjeriti da li je iznos valjan
      if (!this.validateBalance(amount)) {
        throw new Error('Invalid amount for transaction.')
      }

      // Provjeriti da li oba računa imaju tip "checking"
      if (!this.isAccountChecking(fromAccount)) {
        throw new Error(
          `Account ${fromAccount.ownerName} is not a "Checking" account.`
        )
      }

      if (!this.isAccountChecking(toAccount)) {
        throw new Error(
          `Account ${toAccount.ownerName} is not a "Checking" account.`
        )
      }

      // Provjera da li je iznos validan za prenos
      if (fromAccount === toAccount) {
        throw new Error('You cannot transfer money to the same account.')
      }

      // Provjera da li su oba računa aktivna
      if (!fromAccount.isActive || !toAccount.isActive) {
        throw new Error('One or both accounts are inactive.')
      }

      // Provjeriti da li iznos na računu primaoca dovoljno pokriva iznos transakcije
      if (!this.hasSufficientBalance(fromAccount, amount)) {
        throw new Error('Insufficient funds for this transaction.')
      }

      // Ako su sve provjere prošle, transakcija je validna
      return true
    } catch (error) {
      console.log('Error:', error.message)
      return false
    }
  }
}
