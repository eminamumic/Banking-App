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
}
