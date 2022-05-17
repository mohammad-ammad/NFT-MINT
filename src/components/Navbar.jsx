import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">NFT MINTING</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <div className='me-auto'></div>
      <form className="d-flex">
        <button className="btn btn-primary " type="button">Connected</button>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar