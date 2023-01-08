import './index.css'

const StateWiseRecord = props => {
  const {statesTotal} = props
  const {confirmed, deceased, name, population, recovered, active} = statesTotal

  return (
    <li className="record-container">
      <p className="record-content state-name">{name}</p>
      <p className="record-content  confirmed">{confirmed}</p>
      <p className="record-content active">{active}</p>
      <p className="record-content  recovered">{recovered}</p>
      <p className="record-content  deceased">{deceased}</p>
      <p className="record-content population">{population}</p>
    </li>
  )
}

export default StateWiseRecord
