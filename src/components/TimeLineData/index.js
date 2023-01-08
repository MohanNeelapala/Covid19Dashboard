import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class TimeLineData extends Component {
  state = {
    timeLineData: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTimeData()
  }

  getTimeData = async () => {
    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    this.setState({status: apiStatusConstants.inProgress})
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    this.setState({
      timeLineData: fetchedData,
      status: apiStatusConstants.success,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    const {timeLineData} = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const keyNames = Object.keys(timeLineData)

    const singleState = keyNames.find(eachKey => eachKey === stateCode)
    resultList.push(timeLineData[singleState])

    return resultList
  }

  getDates = dates => {
    let sample = {}
    const keyNames = Object.keys(dates)

    keyNames.forEach(eachKey => {
      if (dates[eachKey]) {
        sample = dates[eachKey]
      }
    })
    return sample
  }

  convertLastDatesObjectIntoAList = dates => {
    const lastTenDates = []
    const keyNames = Object.keys(dates)
    const reversedKeyNames = keyNames.reverse()
    reversedKeyNames.forEach(eachKey => {
      if (eachKey !== undefined) {
        const {delta} = dates[eachKey]
        const recoveredCases = delta.recovered ? delta.deceased : 0
        const confirmedCases = delta.confirmed ? delta.confirmed : 0
        const deceasedCases = delta.deceased ? delta.deceased : 0
        const activeCases = confirmedCases - (deceasedCases + recoveredCases)
        const tested = delta.tested ? delta.tested : 0
        const vaccinated = delta.vaccinated1 ? delta.vaccinated1 : 0

        const dateObject = {}
        const monthDetails = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]

        const month = monthDetails[new Date(eachKey).getUTCMonth()]
        const date = new Date(eachKey).getUTCDate()

        dateObject.date = `${date} ${month}`

        dateObject.confirmed = confirmedCases
        dateObject.recovered = recoveredCases
        dateObject.deceased = deceasedCases
        dateObject.active = activeCases
        dateObject.tested = tested
        dateObject.vaccinated = vaccinated
        if (lastTenDates.length < 10) {
          lastTenDates.push(dateObject)
        }
      }
    })
    return lastTenDates.reverse()
  }

  renderBarChart = lastTenDaysCases => {
    const {activeClass} = this.props

    return (
      <div className="graph-container">
        {activeClass === 'confirmed' && (
          <div className="bar-chart-container">
            <BarChart
              width={800}
              height={450}
              stroke="#9A0E31"
              data={lastTenDaysCases}
              className="confirmed-bar-chart"
            >
              <XAxis
                dataKey="date"
                stroke="#9A0E31"
                axisLine={{stroke: '#331427'}}
              />
              <YAxis stroke="#9A0E31" axisLine={{stroke: '#331427'}} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="confirmed"
                fill="#9A0E31"
                className="bar"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}

        {activeClass === 'active' && (
          <div className="bar-chart-container">
            <BarChart
              width={800}
              height={450}
              stroke="#0A4FA0"
              data={lastTenDaysCases}
              className="active-bar-chart"
            >
              <XAxis
                dataKey="date"
                stroke="#0A4FA0"
                axisLine={{stroke: '#161625'}}
              />
              <YAxis axisLine={{stroke: '#161625'}} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="active"
                fill="#0A4FA0"
                className="bar-active-chart"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}
        {activeClass === 'recovered' && (
          <div className="bar-chart-container">
            <BarChart
              width={800}
              height={450}
              stroke="#216837"
              data={lastTenDaysCases}
              className="recovered-bar-chart"
            >
              <XAxis
                dataKey="date"
                stroke="#216837"
                axisLine={{stroke: '#161625'}}
              />
              <YAxis axisLine={{stroke: '#161625'}} />
              <Tooltip />

              <Legend />
              <Bar
                dataKey="recovered"
                fill="#216837"
                className="bar"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}

        {activeClass === 'deceased' && (
          <div className="bar-chart-container">
            <BarChart
              width={800}
              height={450}
              stroke="#474C57"
              data={lastTenDaysCases}
              className="bar-deceased-chart"
            >
              <XAxis
                dataKey="date"
                stroke="#474C57"
                axisLine={{stroke: '#161625'}}
              />
              <YAxis axisLine={{stroke: '#161625'}} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="deceased"
                fill="#474C57"
                className="bar"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}
      </div>
    )
  }

  renderLineChart = lastTenDaysCases => (
    <div className="graph-container" testid="lineChartsContainer">
      <div className="line-chart-container">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          className="line-confirmed-chart"
          Legend="confirmed"
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            label={{fill: 'red', fontSize: 10}}
            stroke="#FF073A"
            axisLine={{stroke: '#FF073A'}}
          />
          <YAxis axisLine={{stroke: '#FF073A'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="confirmed" stroke="#FF073A" />
        </LineChart>
      </div>
      <div className="line-chart-container">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="line-active-chart"
        >
          <XAxis
            dataKey="date"
            stroke="#007BFF"
            axisLine={{stroke: '#007BFF'}}
          />
          <YAxis axisLine={{stroke: '#007BFF'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="active" stroke="#007BFF" />
        </LineChart>
      </div>
      <div className="line-chart-container">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="line-recovered-chart"
        >
          <XAxis
            dataKey="date"
            stroke="#27A243"
            axisLine={{stroke: '#27A243'}}
          />
          <YAxis axisLine={{stroke: '#27A243'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="recovered" stroke="#27A243" />
        </LineChart>
      </div>

      <div className="line-chart-container">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="line-deceased-chart"
        >
          <XAxis
            dataKey="date"
            stroke="#6C757D"
            axisLine={{stroke: '#6C757D'}}
          />
          <YAxis axisLine={{stroke: '#6C757D'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="deceased" stroke="#6C757D" />
        </LineChart>
      </div>
      <div className="line-chart-container">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="line-tested-chart"
        >
          <XAxis
            dataKey="date"
            stroke="#9673B9"
            axisLine={{stroke: '#9673B9'}}
          />
          <YAxis axisLine={{stroke: '#9673B9'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tested" stroke="#9673B9" />
        </LineChart>
      </div>
    </div>
  )

  getLastDateOfMonth = dates => {
    const lastDates = []
    const keyNames = Object.keys(dates)
    keyNames.forEach(eachKey => {
      const dateString = eachKey
      const date = Date.parse(dateString)
      const dateStamp = new Date(date)
      const lastDateOfMonth = new Date(
        dateStamp.getFullYear(),
        dateStamp.getMonth() + 1,
        0,
      )

      if (!lastDates.includes(`${lastDateOfMonth}`)) {
        lastDates.push(lastDateOfMonth)
      }
    })
  }

  renderTimeLineData = () => {
    const singleTimeLineDataList = this.convertObjectsDataIntoListItemsUsingForInMethod()

    const [dates] = singleTimeLineDataList

    const allDates = this.getDates(dates)

    const lastTenDaysCases = this.convertLastDatesObjectIntoAList(allDates)

    return (
      <div>
        {this.renderBarChart(lastTenDaysCases)}
        <h1 className="heading">Daily Spread Trends</h1>
        {this.renderLineChart(lastTenDaysCases)}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="timelinesDataLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const renderTimeLines = () => {
      const {status} = this.state

      switch (status) {
        case apiStatusConstants.success:
          return this.renderTimeLineData()
        case apiStatusConstants.inProgress:
          return this.renderLoadingView()
        default:
          return null
      }
    }

    return <div>{renderTimeLines()}</div>
  }
}

export default withRouter(TimeLineData)
