import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
class MoneyManager extends Component {
  state = {
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    titleInput: '',
    amountInput: '',
    transactionCategory: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  onChangeTitle = e => {
    this.setState({titleInput: e.target.value})
  }

  onChangeAmount = e => {
    this.setState({amountInput: e.target.value})
  }

  optionsHangler = e => {
    this.setState({transactionCategory: e.target.value})
  }

  formHangler = e => {
    e.preventDefault()
    const {transactionCategory, amountInput, titleInput} = this.state
    const amountVal = parseFloat(amountInput) || 0

    if (amountVal <= 0) {
      console.log('Please enter a valid positive number')
      return
    }

    const newHistory = {
      id: uuidv4(),
      category: transactionCategory,
      amount: amountVal,
      title: titleInput,
    }

    switch (transactionCategory) {
      case 'INCOME':
        this.setState(prev => ({
          totalBalance: prev.totalBalance + amountVal,
          totalIncome: prev.totalIncome + amountVal,
          titleInput: '',
          amountInput: '',
          transactionsList: [...prev.transactionsList, newHistory],
        }))
        break
      case 'EXPENSES':
        this.setState(prev => ({
          totalBalance: prev.totalBalance - amountVal,
          totalExpenses: prev.totalExpenses + amountVal,
          titleInput: '',
          amountInput: '',
          transactionsList: [...prev.transactionsList, newHistory],
        }))
        break
      default:
        break
    }
  }

  onDelete = historyDetails => {
    const {category, amount, id} = historyDetails
    this.setState(prev => {
      let updatedBalance = prev.totalBalance
      let updatedIncome = prev.totalIncome
      let updatedExpenses = prev.totalExpenses
      const updatedTransactionList = prev.transactionsList.filter(
        eachHistory => eachHistory.id !== id,
      )

      if (category === 'INCOME') {
        updatedBalance -= amount
        updatedIncome -= amount
      } else if (category === 'EXPENSES') {
        updatedBalance += amount
        updatedExpenses -= amount
      }

      return {
        totalBalance: Math.max(updatedBalance, 0),
        totalIncome: Math.max(updatedIncome, 0),
        totalExpenses: Math.max(updatedExpenses, 0),
        transactionsList: updatedTransactionList,
      }
    })
  }

  render() {
    const {
      totalBalance,
      totalExpenses,
      totalIncome,
      titleInput,
      amountInput,
      transactionCategory,
      transactionsList,
    } = this.state
    return (
      <div className="app-container">
        <div className="container">
          <div className="title-section">
            <h1>Hi, Krishna</h1>
            <p>
              Welcome back to your <span className="title">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            totalBalance={totalBalance}
            totalExpenses={totalExpenses}
            totalIncome={totalIncome}
          />
          <div className="transactions-and-history">
            <div className="add-transaction-form-container">
              <h3>Add Transaction</h3>
              <form
                onSubmit={this.formHangler}
                className="add-transaction-form"
              >
                <label htmlFor="title">TITLE</label>
                <input
                  onChange={this.onChangeTitle}
                  placeholder="TITLE"
                  type="text"
                  id="title"
                  value={titleInput}
                />
                <label htmlFor="amount">AMOUNT</label>
                <input
                  onChange={this.onChangeAmount}
                  placeholder="AMOUNT"
                  type="text"
                  id="amount"
                  value={amountInput}
                />
                <label htmlFor="type">TYPE</label>
                <select
                  value={transactionCategory}
                  onChange={this.optionsHangler}
                  id="type"
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit">Add</button>
              </form>
            </div>
            <div className="history-container">
              <h3>History</h3>
              <ul>
                <li className="table-headings">
                  <p>Title</p>
                  <p>Amount</p>
                  <p>Type</p>
                  <p> </p>
                </li>
                {transactionsList.map(eachHistory => (
                  <TransactionItem
                    key={eachHistory.id}
                    historyDetails={eachHistory}
                    onDelete={this.onDelete}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
