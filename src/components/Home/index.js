import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Course from '../Course'

import './index.css'

const loaderStatus = {
  initial: 'INITIAL',
  isProgress: 'IS_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {list: [], isLoading: loaderStatus.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({isLoading: loaderStatus.isProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const data = await response.json()
      const update = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({list: update, isLoading: loaderStatus.success})
    } else {
      this.setState({isLoading: loaderStatus.failure})
    }
  }

  reRender = () => {
    this.getCourseDetails()
  }

  successView = () => {
    const {list} = this.state
    return (
      <div className="courses-container">
        <h1 className="heading-courses">Courses</h1>
        <ul className="courses-unordered-list">
          {list.map(each => (
            <Course list={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="heading-home-failure-view">OOps! Something Went Wrong</h1>
      <p className="home-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="buttn-failre-view"
        onClick={this.reRender}
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader" className="loader-style">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPage = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case loaderStatus.isProgress:
        return this.loadingView()
      case loaderStatus.failure:
        return this.failureView()
      case loaderStatus.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    // const {list} = this.state
    return (
      <>
        <div className="home-container">{this.renderPage()}</div>
      </>
    )
  }
}
export default Home
