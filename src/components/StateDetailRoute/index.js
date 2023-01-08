import './index.css'

const StateSpecificIcons = props => {
  const {
    statesTotal,
    showConfirmed,
    showActive,
    showRecovered,
    showDeceased,
    showActiveCases,
    showDeceasedCases,
    showRecoveredCases,
    showConfirmedCases,
  } = props

  const {confirmed, deceased, recovered, active} = statesTotal

  const onClickConfirmed = () => {
    showConfirmed()
  }

  const onClickActive = () => {
    showActive()
  }

  const onClickRecovered = () => {
    showRecovered()
  }

  const onClickDeceased = () => {
    showDeceased()
  }

  const activeConfirmedClass = showConfirmedCases
    ? 'confirmed-active-class'
    : ''
  const activeActiveClass = showActiveCases ? 'active-active-class' : ''

  const activeRecoveredClass = showRecoveredCases
    ? `recovered-active-class`
    : ''

  const activeDeceasedClass = showDeceasedCases ? `deceased-active-class` : ''

  return (
    <ul className="home-icons-list">
      <li
        onClick={onClickConfirmed}
        className={`cases-icon confirmed ${activeConfirmedClass}`}
        testid="stateSpecificConfirmedCasesContainer"
      >
        <p className="cases-type">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670996798/confirmed_logo_vk5blt.png"
          alt="state specific confirmed cases pic"
        />
        <p className="cases-count confirmed">{confirmed}</p>
      </li>

      <li
        onClick={onClickActive}
        className={`cases-icon active ${activeActiveClass}`}
        testid="stateSpecificActiveCasesContainer"
      >
        <p className="cases-type">Active</p>
        <img
          src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670996907/active_logo_qaj6du.png"
          alt="state specific active cases pic"
        />
        <p className="cases-count active">{active}</p>
      </li>

      <li
        onClick={onClickRecovered}
        className={`cases-icon recovered ${activeRecoveredClass}`}
        testid="stateSpecificRecoveredCasesContainer"
      >
        <p className="cases-type">Recovered</p>
        <img
          src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670997060/recovered_logo_dn8u4v.png"
          alt="state specific recovered cases pic"
        />
        <p className="cases-count recovered">{recovered}</p>
      </li>

      <li
        onClick={onClickDeceased}
        className={`cases-icon deceased ${activeDeceasedClass}`}
        testid="stateSpecificDeceasedCasesContainer"
      >
        <p className="cases-type">Deceased</p>
        <img
          src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670997143/Deceased_logo_dbv4ag.png"
          alt="state specific deceased cases pic"
        />
        <p className="cases-count deceased">{deceased}</p>
      </li>
    </ul>
  )
}

export default StateSpecificIcons
