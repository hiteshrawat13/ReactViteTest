import React from 'react'

const Section = ({children,title=null}) => {
  return (
    <div className='section'>
        {title && <div className='title'>{title}</div> }
        <div className="content">{children}</div>
    </div>
  )
}

export default Section