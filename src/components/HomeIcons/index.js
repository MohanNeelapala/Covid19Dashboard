import './index.css'

const HomeIcons = props => {
  const {statesTotal} = props

  const {confirmed, deceased, recovered, active} = statesTotal

  return (
    <div className="home-icons-container">
      <div className="cases-icon confirmed" testid="countryWideConfirmedCases">
        <p className="cases-type">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670996798/confirmed_logo_vk5blt.png"
          alt="country wide confirmed cases pic"
        />
        <p className="cases-count confirmed">{confirmed}</p>
      </div>
      <div className="cases-icon active" testid="countryWideActiveCases">
        <p className="cases-type">Active</p>
        <img
          src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670996907/active_logo_qaj6du.png"
          alt="country wide active cases pic"
        />
        <p className="cases-count active">{active}</p>
      </div>
      <div className="cases-icon recovered" testid="countryWideRecoveredCases">
        <p className="cases-type">Recovered</p>
        <img
          src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670997060/recovered_logo_dn8u4v.png"
          alt="country wide recovered cases pic"
        />
        <p className="cases-count recovered">{recovered}</p>
      </div>

      <div className="cases-icon deceased" testid="countryWideDeceasedCases">
        <p className="cases-type">Deceased</p>
        <img
          src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670997143/Deceased_logo_dbv4ag.png"
          alt="country wide deceased cases pic"
        />
        <p className="cases-count deceased">{deceased}</p>
      </div>
    </div>
  )
}

export default HomeIcons
