import React from 'react'

function NavBar(props) {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
      <div className="navbar-brand" href="#"><span className='badge bg-light text-dark fs-4'>NewsMage</span></div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
          <li className="nav-item">
            <div className="nav-link" onClick={()=> props.setCategory("business")} >business</div>
          </li>
          <li className="nav-item">
            <div className="nav-link" onClick={()=> props.setCategory("entertainment")}>entertainment</div>
          </li>
          <li className="nav-item">
            <div className="nav-link" onClick={()=> props.setCategory("general")} >general</div>
          </li>
          <li className="nav-item">
            <div className="nav-link" onClick={()=> props.setCategory("health")} >health</div>
          </li>
          
          <li className="nav-item">
            <div className="nav-link" onClick={()=> props.setCategory("science")} > science</div>
          </li>
          
          <li className="nav-item">
            <div className="nav-link" onClick={()=> props.setCategory("sports")} >sports</div>
          </li>
          
          <li className="nav-item">
            <div className="nav-link" onClick={()=> props.setCategory("technology")} >technology</div>
          </li>
          
        </ul>
       
      </div>
    </div>
  </nav>
  )
}

export default NavBar