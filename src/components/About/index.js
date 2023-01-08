import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FaqItem from '../FaqItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class About extends Component {
  state = {
    faqsList: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    this.setState({status: apiStatus.inProgress})

    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const faqsData = await response.json()
      this.setState({faqsList: faqsData.faq, status: apiStatus.success})
    }
  }

  renderAbout = () => {
    const {faqsList} = this.state

    return (
      <div className="about-container">
        <h1 className="about-heading">About</h1>
        <p className="para">Last update on march 28th 2021.</p>
        <p className="description">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="faqs-list" testid="faqsUnorderedList">
          {faqsList.map(eachFaq => (
            <FaqItem data={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="aboutRouteLoader">
      <Loader type="Oval" color="#007bff" height="50" width="50" />
    </div>
  )

  renderAboutRoute = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderAbout()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderAboutRoute()}
      </>
    )
  }
}

export default About
