import React from 'react'
import Notification from '../components/Notification'
import PropTypes from 'prop-types'

const Header = ({ title, notification }) => (
  <div>
    <h1>{title}</h1>
    <Notification notification={notification} />
  </div>
)
Header.propTypes = {
  title: PropTypes.string.isRequired,
  notification: PropTypes.object.isRequired,
}
export default Header