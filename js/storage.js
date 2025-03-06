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
}
