import React from 'react'

const Row = ({children}) => {
  return (
    <div className="row" style={{display:"flex",gap:"20px",margin:"0px 0px"}}>{children}</div>
  )
}

export default Row