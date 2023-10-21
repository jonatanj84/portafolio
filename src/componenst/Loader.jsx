import React from 'react'
import  "./Loader.css";

export const Loader = () => {
  return (
    <div>
        {/*para cargar el componete loadin se ingresa en la pagina Loadin.io animaciones*/}
        <h1>Loader</h1>
        <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div></div>
  )
}

export default Loader

