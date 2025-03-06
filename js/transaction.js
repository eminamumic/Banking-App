export class Transaction {
  constructor(fromAccount, toAccount, amount, type) {
    this.fromAccount = fromAccount
    this.toAccount = toAccount
    this.amount = amount
    this.type = type
    this.date = new Date().toISOString()
  }

  formatTransaction() {
    if (this.type === 'deposit') {
      return `Deposit of ${this.amount} to account ${this.toAccount} on ${this.date}`
    } else if (this.type === 'withdraw') {
      return `Withdrawal of ${this.amount} from account ${this.fromAccount} on ${this.date}`
    } else if (this.type === 'transfer') {
      return `Transfer of ${this.amount} from ${this.fromAccount} to ${this.toAccount} on ${this.date}`
    } else {
      return 'Unknown transaction type'
    }
  }
}
