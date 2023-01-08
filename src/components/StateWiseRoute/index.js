import './index.css'

const StateWiseRoute = props => {
  const {
    districtDetails,
    showConfirmedCases,
    showRecoveredCases,
    showDeceasedCases,
    showActiveCases,
  } = props

  const {districtName, confirmed, recovered, deceased, active} = districtDetails
  return (
    <li className="district-stats">
      <div className="count-container">
        {showConfirmedCases && <p className="cases-count">{confirmed}</p>}
        {showRecoveredCases && <p className="cases-count">{recovered}</p>}
        {showDeceasedCases && <p className="cases-count">{deceased}</p>}
        {showActiveCases && <p className="cases-count">{active}</p>}
      </div>
      <div className="name-container">
        <p className="district-name ">{districtName}</p>
      </div>
    </li>
  )
}

export default StateWiseRoute
