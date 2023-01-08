import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SearchRecco from '../SearchRecco'
import StateWiseRecord from '../StateWiseRecord'
import HomeIcons from '../HomeIcons'
import Footer from '../Footer'

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
let tableData = []

class Home extends Component {
  state = {
    stateWiseData: {},
    showStateStats: true,
    showSearchRecco: false,
    searchInput: '',
    status: apiStatusConstants.initial,
    sortedList: tableData,
    showInAsc: false,
    showInDesc: false,
    showInitialTable: true,
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
      stateWiseData: fetchedData,
      status: apiStatusConstants.success,
    })
  }

  onchangeSearchInput = event => {
    if (event.target.value === '') {
      this.setState({
        showSearchRecco: false,
        searchInput: event.target.value,
        showStateStats: true,
      })
    } else {
      this.setState({
        showSearchRecco: true,
        searchInput: event.target.value,
        showStateStats: false,
      })
    }
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    const {stateWiseData} = this.state

    const keyNames = Object.keys(stateWiseData)

    keyNames.forEach(keyName => {
      if (stateWiseData[keyName]) {
        const {total} = stateWiseData[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = stateWiseData[keyName].meta.population
          ? stateWiseData[keyName].meta.population
          : 0
        let stateName
        const name = statesList.find(state => state.state_code === keyName)
        if (name !== undefined) {
          stateName = name.state_name
        }

        resultList.push({
          stateCode: keyName,
          name: stateName,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })

    return resultList
  }

  sortInAsc = (array, key) =>
    array.sort((a, b) => {
      const x = a[key]
      const y = b[key]
      return x < y ? -1 : 1
    })

  sortAscending = () => {
    const sortedTable = this.sortInAsc(tableData, 'name')
    this.setState({
      sortedList: sortedTable,
      showInAsc: true,
      showInitialTable: false,
    })
  }

  sortInDesc = (array, key) =>
    array.sort((a, b) => {
      const x = a[key]
      const y = b[key]
      return x > y ? -1 : 1
    })

  sortDescending = () => {
    const sortedTable = this.sortInDesc(tableData, 'name')
    this.setState({
      sortedList: sortedTable,
      showInDesc: true,
      showInitialTable: false,
    })
  }

  renderCovidDashBoard = () => {
    const {
      searchInput,
      showSearchRecco,
      showStateStats,
      sortedList,
      showInAsc,
      showInDesc,
      showInitialTable,
    } = this.state

    tableData = this.convertObjectsDataIntoListItemsUsingForInMethod()

    let filteredList = []
    filteredList = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const convertFilteredList = state => ({
      stateCode: state.state_code,
      stateName: state.state_name,
    })

    const updatedFilteredList = filteredList.map(eachState =>
      convertFilteredList(eachState),
    )

    const getCasesCount = (a, b) => ({
      confirmed: a.confirmed + b.confirmed,
      deceased: a.deceased + b.deceased,
      recovered: a.recovered + b.recovered,
      active: a.active + b.active,
    })

    const sum = tableData.reduce(getCasesCount)

    return (
      <div className="bg-container">
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input
            type="search"
            className="search-input"
            placeholder="Enter the State"
            onChange={this.onchangeSearchInput}
            value={searchInput}
          />
        </div>
        {showSearchRecco && (
          <ul
            className="search-recommendation-list"
            testid="searchResultsUnorderedList"
          >
            {updatedFilteredList.map(eachState => (
              <SearchRecco key={eachState.stateCode} state={eachState} />
            ))}
          </ul>
        )}

        <div className="states-records-container">
          {showStateStats && (
            <div className="stats-section">
              <div className="home-logos">
                <HomeIcons statesTotal={sum} />
              </div>

              <div
                className="states-table-container"
                testid="stateWiseCovidDataTable"
              >
                <div className="state-wise-records-container">
                  <div className="table-records">
                    <div className="column-heading-container">
                      <div className="sorting-item">
                        <p className="column-name states">States/UT</p>
                        <button
                          type="button"
                          className="sort-icon"
                          onClick={this.sortAscending}
                          testid="ascendingSort"
                        >
                          <FcGenericSortingAsc />
                        </button>
                        <button
                          type="button"
                          className="sort-icon"
                          onClick={this.sortDescending}
                          testid="descendingSort"
                        >
                          <FcGenericSortingDesc />
                        </button>
                      </div>
                      <p className="column-name">Confirmed</p>
                      <p className="column-name">Active</p>
                      <p className="column-name">Recovered</p>
                      <p className="column-name">Deceased</p>
                      <p className="column-name pop-column">Population</p>
                    </div>
                    <ul className="covid-stats">
                      {showInitialTable &&
                        tableData.map(
                          eachTotal =>
                            eachTotal.name !== undefined && (
                              <StateWiseRecord
                                key={eachTotal.stateCode}
                                statesTotal={eachTotal}
                              />
                            ),
                        )}
                      {showInAsc &&
                        sortedList.map(
                          eachTotal =>
                            eachTotal.name !== undefined && (
                              <StateWiseRecord
                                key={eachTotal.confirmed}
                                statesTotal={eachTotal}
                              />
                            ),
                        )}
                      {showInDesc &&
                        sortedList.map(
                          eachTotal =>
                            eachTotal.name !== undefined && (
                              <StateWiseRecord
                                key={eachTotal.confirmed}
                                statesTotal={eachTotal}
                              />
                            ),
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="homeRouteLoader">
      <Loader type="Oval" color="#007bff" height="50" width="50" />
    </div>
  )

  renderHomeRoute = () => {
    const {status} = this.state

    switch (status) {
      case apiStatusConstants.success:
        return this.renderCovidDashBoard()

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
        {this.renderHomeRoute()}
      </div>
    )
  }
}

export default Home
