import React from 'react'

const User = ({ name, imgUrl }) => {
  return (
    <React.Fragment>
      <p>{name}</p>
      <img src={imgUrl} alt="profle"/>
    </React.Fragment>
  )
}

export { User}