import {Component} from 'react'
import Loader from 'react-loader-spinner'

import StateSpecificIcons from '../StateDetailRoute'
import StateWiseRoute from '../StateWiseRoute'
import TimeLineData from '../TimeLineData'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const activeConstants = {
  confirm: 'confirmed',
  active: 'active',
  recovered: 'recovered',
  deceased: 'deceased',
}

class StateSpecificRoute extends Component {
  state = {
    showConfirmedCases: true,
    showActiveCases: false,
    showRecoveredCases: false,
    showDeceasedCases: false,
    activeClass: activeConstants.confirm,
    stateWiseData: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      status: apiStatusConstants.inProgress,
    })

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    this.setState({
      status: apiStatusConstants.success,
      stateWiseData: fetchedData,
    })
  }

  convertDataFormat = () => {
    const {stateWiseData} = this.state
    const resultList = []

    const stateKeyNames = Object.keys(stateWiseData)

    stateKeyNames.forEach(keyName => {
      if (stateWiseData[keyName]) {
        const {total} = stateWiseData[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = stateWiseData[keyName].meta.population
          ? stateWiseData[keyName].meta.population
          : 0
        const lastUpdated = stateWiseData[keyName].meta.last_updated
          ? stateWiseData[keyName].meta.last_updated
          : 'No Report'

        let districtDetails = []
        districtDetails = stateWiseData[keyName].districts
        resultList.push({
          stateCode: keyName,
          name: statesList.find(eachState => eachState.state_code === keyName),
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
          lastUpdated,
          districts: districtDetails,
        })
      }
    })
    return resultList
  }

  convertDistrictObjectIntoList = districts => {
    const districtDetailsList = []
    const districtKeyName = Object.keys(districts)
    districtKeyName.forEach(keyName => {
      if (districts[keyName]) {
        const {total} = districts[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0

        districtDetailsList.push({
          districtName: keyName,
          confirmed,
          recovered,
          deceased,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })

    return districtDetailsList
  }

  renderStateSpecificData = () => {
    const {
      showConfirmedCases,
      showActiveCases,
      showRecoveredCases,
      showDeceasedCases,
      activeClass,
    } = this.state

    const {match} = this.props

    const {params} = match

    const currentCode = params.stateCode

    const tableData = this.convertDataFormat()

    const currentStateDetails = tableData.filter(
      each => each.stateCode === currentCode,
    )

    const [currentState] = currentStateDetails

    let lastUpdate = currentState.lastUpdated
    lastUpdate = new Date(lastUpdate)

    const testedCount = currentState.tested

    const stateName = currentState.name.state_name

    const [specificStateDetails] = currentStateDetails
    const {districts} = specificStateDetails

    const districtDataList = this.convertDistrictObjectIntoList(districts)

    const sortCases = (array, key) =>
      array.sort((a, b) => {
        const x = a[key]
        const y = b[key]
        return x > y ? -1 : 1
      })

    const sortedArray = sortCases(districtDataList, activeClass)

    const showConfirmed = () => {
      this.setState({
        showConfirmedCases: true,
        showActiveCases: false,
        showDeceasedCases: false,
        showRecoveredCases: false,
        activeClass: activeConstants.confirm,
      })
    }

    const showActive = () => {
      this.setState({
        showConfirmedCases: false,
        showActiveCases: true,
        showDeceasedCases: false,
        showRecoveredCases: false,
        activeClass: activeConstants.active,
      })
    }

    const showDeceased = () => {
      this.setState({
        showConfirmedCases: false,
        showActiveCases: false,
        showDeceasedCases: true,
        showRecoveredCases: false,
        activeClass: activeConstants.deceased,
      })
    }

    const showRecovered = () => {
      this.setState({
        showConfirmedCases: false,
        showActiveCases: false,
        showDeceasedCases: false,
        showRecoveredCases: true,
        activeClass: activeConstants.recovered,
      })
    }

    const districtHeadingActiveClass = () => {
      switch (activeClass) {
        case activeConstants.confirm:
          return 'confirmed-head'
        case activeConstants.recovered:
          return ' recovered-head'
        case activeConstants.active:
          return 'active-head'
        case activeConstants.deceased:
          return 'deceased-head'
        default:
          return null
      }
    }

    const districtHeadingActive = districtHeadingActiveClass()

    return (
      <div className="state-specific-details-route">
        <div className="banner-card">
          <div className="state-details-container">
            <h1 className="state-name-card">{stateName}</h1>
            <p className="last-update">{`Last Update on ${lastUpdate.toLocaleString(
              'default',
              {month: 'long'},
            )} ${lastUpdate.getDate()} ${lastUpdate.getFullYear()}`}</p>
          </div>
          <div className="tested-count-container">
            <p className="tested-head">Tested</p>
            <p className="test-count">{testedCount}</p>
          </div>
        </div>

        <ul className="cases-types">
          {currentStateDetails.map(each => (
            <StateSpecificIcons
              key={each.stateCode}
              showConfirmed={showConfirmed}
              showActive={showActive}
              showRecovered={showRecovered}
              showDeceased={showDeceased}
              statesTotal={each}
              showActiveCases={showActiveCases}
              showDeceasedCases={showDeceasedCases}
              showRecoveredCases={showRecoveredCases}
              showConfirmedCases={showConfirmedCases}
            />
          ))}
        </ul>

        <h1 className={`districts-heading ${districtHeadingActive}`}>
          Top Districts
        </h1>

        <ul className="districts-data-list" testid="topDistrictsUnorderedList">
          {sortedArray.map(eachState => (
            <StateWiseRoute
              key={eachState.districtName}
              districtDetails={eachState}
              showConfirmedCases={showConfirmedCases}
              showActiveCases={showActiveCases}
              showRecoveredCases={showRecoveredCases}
              showDeceasedCases={showDeceasedCases}
            />
          ))}
        </ul>

        <TimeLineData activeClass={activeClass} />
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="Oval" color="#007bff" height="50" width="50" />
    </div>
  )

  renderStateSpecificDetails = () => {
    const {status} = this.state

    switch (status) {
      case apiStatusConstants.success:
        return this.renderStateSpecificData()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderStateSpecificDetails()}
      </div>
    )
  }
}

export default StateSpecificRoute
