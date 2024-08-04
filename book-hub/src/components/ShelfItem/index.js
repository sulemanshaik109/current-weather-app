import './index.css'

const ShelfItem = props => {
  const {shelfData, activeShelf, selectShelf} = props
  const {label, value} = shelfData
  const activeShelfClassName =
    activeShelf === value ? 'active-shelf-btn' : 'shelf-btn'

  const onClickShelf = () => {
    selectShelf(value)
  }

  return (
    <li className="shelf-item">
      <button
        className={activeShelfClassName}
        type="button"
        onClick={onClickShelf}
      >
        {label}
      </button>
    </li>
  )
}

export default ShelfItem
