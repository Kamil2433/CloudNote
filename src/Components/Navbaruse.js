import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLogin } from '../Context/LoginContext';
import { useNotes } from '../Context/NotesContext';
import Alertcomponent from './Alertcomponent';








function Navbaruse() {

  const {setname,setid,setauth}=useLogin()
  const {setnotes,Showalert,setalert,message,setmessage}=useNotes()

  const logout=()=>{

        setname('')
        setid('')
setauth('')
setnotes('')

  }


  const {name}=useLogin()
   const string=name;
      const istrue=string.length==0;

  return (




    <div className="float-right" >
    <Navbar expand="lg" className="bg-body-tertiary" >
    <Container>

     {!istrue?
     <a> {name}, Welcome to CloudNote </a>:
     <a>Welcome</a> }
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>


          {!istrue?
          <button onClick={logout}>Logout</button>:
     <a></a> }
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  {Showalert===true ?
  <Alertcomponent    mess={message} />:
  <div></div>
  }
  </div>
  )
}


export default Navbaruse