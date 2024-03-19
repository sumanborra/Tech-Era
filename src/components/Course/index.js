import {Link} from 'react-router-dom'
import './index.css'

const Course = props => {
  const {list} = props
  const {id, logoUrl, name} = list

  return (
    <li className="list-item">
      <Link to={`/courses/${id}`} className="button-list-items">
        <img src={logoUrl} alt={name} className="logo-image" />
        <p className="para-list-item">{name}</p>
      </Link>
    </li>
  )
}
export default Course
