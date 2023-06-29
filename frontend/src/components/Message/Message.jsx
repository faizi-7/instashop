import React from 'react'
import './Message.scss'

const Message = ({variant, children}) => {
  return (
    <div className={`${variant} message`}>{children}</div>
  )
}

export default Message