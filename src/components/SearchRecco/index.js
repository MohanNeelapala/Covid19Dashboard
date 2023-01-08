import {BiChevronRightSquare} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'

const SearchRecco = props => {
  const {state} = props
  const {stateCode, stateName} = state

  return (
    <Link className="link-item" to={`/state/${stateCode}`}>
      <li className="state-item">
        <p className="state-name">{stateName}</p>
        <div className="state-code-item">
          <p className="state-code">{stateCode}</p>
          <BiChevronRightSquare className="right-square-icon" />
        </div>
      </li>
    </Link>
  )
}
export default SearchRecco
