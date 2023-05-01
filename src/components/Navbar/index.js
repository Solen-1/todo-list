import React, {useState} from 'react'
import {Container, Buttons, Header, Wrapper, PartX, Icon} from './styles'
import {BsCardChecklist} from 'react-icons/bs'
import {BiUserCircle} from 'react-icons/bi'
import {signOut} from 'firebase/auth'
import {auth} from '../../firebase'


function Navbar({currentUser, setCurrentUser}) {

  const [toggleMenu, setToggleMenu] = useState(false);
  let controls;

  function handleLogOut(){
    signOut(auth).then(()=>{
      setCurrentUser(null)
      setToggleMenu(false)
    }).catch(err=>{
      console.log(err)
    })
  }

  if(currentUser){
    controls = (
      <Wrapper>
        <Buttons onClick={handleLogOut}>Log Out</Buttons>
      </Wrapper>
    )
  } else {
    controls = (
      <Wrapper>
        <Buttons>Log In</Buttons>
          <PartX/>
        <Buttons>Sign Up</Buttons>
      </Wrapper>
    )
  }

  return (
    <Container>
      <div style={{display:'flex',flexDirection:'row'}}>
        <BsCardChecklist size={27} color='white'/> 
        <Header>Task Management Tool</Header>
      </div>
      {/* {currentUser&&<Header style={{color:'white'}}>Hello, {currentUser.displayName}</Header>} */}
      <Icon>
        <BiUserCircle size={35} style={{marginLeft:'auto'}}  onClick={()=>setToggleMenu(prev=>!prev)}/>
      </Icon>
      {toggleMenu && controls}
    </Container>
  )
}

export default Navbar