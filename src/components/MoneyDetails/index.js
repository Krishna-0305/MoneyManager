import './index.css'

const MoneyDetails = props => {
  const {totalBalance, totalExpenses, totalIncome} = props
  return (
    <div className="money-details">
      <div className="card blnc-crd">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="card-content">
          <p>Your Balance</p>
          <p data-testid="balanceAmount">Rs {totalBalance}</p>
        </div>
      </div>
      <div className="card incm-crd">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="card-content">
          <p>Your Income</p>
          <p data-testid="incomeAmount">Rs {totalIncome}</p>
        </div>
      </div>
      <div className="card exps-crd">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="card-content">
          <p>Your expenses</p>
          <p data-testid="expensesAmount">Rs {totalExpenses}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
