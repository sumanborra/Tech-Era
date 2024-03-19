import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const loaderStatus = {
  initial: 'INITIAL',
  isProgress: 'IS_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CoursesItem extends Component {
  state = {isLoading: loaderStatus.initial, resultObject: ''}

  componentDidMount() {
    this.getResultOFItem()
  }

  getResultOFItem = async () => {
    this.setState({isLoading: loaderStatus.isProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const update = {
        id: data.course_details.id,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      this.setState({resultObject: update, isLoading: loaderStatus.success})
    } else {
      this.setState({isLoading: loaderStatus.failure})
    }
  }

  reRender = () => {
    this.getResultOFItem()
  }

  successView = () => {
    const {resultObject} = this.state
    const {imageUrl, description, name} = resultObject
    return (
      <div className="card-container">
        <img src={imageUrl} alt={name} className="items-image" />
        <div>
          <h1 className="name-text-items-detaisl">{name}</h1>
          <p className="description">{description}</p>
        </div>
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
    return <div className="course-item-container">{this.renderPage()}</div>
  }
}
export default CoursesItem
