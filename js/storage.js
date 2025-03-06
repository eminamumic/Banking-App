export class Storage {
  static getStoredAccounts() {
    try {
      const storedAccounts = localStorage.getItem('accounts')
      return storedAccounts ? JSON.parse(storedAccounts) : [] // Ako postoje spremljeni računi, vraća ih, inače vraća praznu listu
    } catch (error) {
      console.error('Error fetching accounts from localStorage:', error)
      return []
    }
  }

  static saveUserAccount(newUser) {
    let accounts = this.getStoredAccounts()
    accounts.push(newUser)
    localStorage.setItem('accounts', JSON.stringify(accounts))
  }

  static saveCurrentUserAccount(user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  static updateStoredUserAccount(updatedUser) {
    let accounts = this.getStoredAccounts()

    const userIndex = accounts.findIndex(
      (account) => account.accountNumber === updatedUser.accountNumber
    )

    if (userIndex !== -1) {
      // Pravilna provjera
      accounts[userIndex] = updatedUser
      localStorage.setItem('accounts', JSON.stringify(accounts)) // Ažuriranje localStorage
    }
  }
}
