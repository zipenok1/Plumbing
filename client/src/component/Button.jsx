import React from 'react'
import '../styles/button.css'

function Button({we_text}) {

  return (
    <div className='Button'>
        <div className="Button__content">
            <button>{we_text}</button>
        </div>
    </div>
  )
}

export default Button