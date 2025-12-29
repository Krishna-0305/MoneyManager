import './index.css'

const TransactionItem = props => {
  const {historyDetails, onDelete} = props
  const {category, amount, title} = historyDetails
  const onDeleteHistory = () => {
    onDelete(historyDetails)
  }
  return (
    <li className="table-values">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{category === 'INCOME' ? 'Income' : 'Expenses'}</p>
      <button
        data-testid="delete"
        className="del-btn"
        onClick={onDeleteHistory}
        type="button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
