import React from 'react'
import './Reasons.css'
function Reasons() {
    return (
        <div>
        <div className ="lp1container1">
        <div className = "lptitle"> <h1> Why Stock Mocket?</h1></div>
        <div className = "lpreasons"> 
        <div className = "lpreasonbox"> 
       <div>  <img src='./Images/secure-data .png' className = "iconsize"/> </div> 
       <div className = "titledesc"> <h1> Secure </h1>  </div> 
        <div> some description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d</div>
         </div>
        <div className = "lpreasonbox">
        <div>  <img src='./images/fast.png' className = "iconsize"/> </div> 
        <div className = "titledesc"><h1> Fast </h1>  </div> 
        <div> some description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d</div></div>
        <div className = "lpreasonbox"> 
        <div>  <img src='./images/free .png' className = "iconsize"/> </div> 
        <div className = "titledesc"><h1> Free </h1>  </div> 
        <div className = "desc"> some description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d</div></div>

        </div>
        
    </div>
    <div className ='lpcontainer2'>  
    <div className = "box1"> <img src =" ./Images/stockmocket.jpeg" /> </div>
    <div className = "box2">  
    <h1> Trade with confidence </h1>
    <div className= 'box3'>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
               sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
               quis nat Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
               sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
               quis nat  t Lorem ip t Lorem ip</div>
     </div>
     </div>
    <div className ='lpcontainer3'>  
        <h1> Get Started In Three Easy Steps</h1> 
    <div className ='container3steps'> 
    <div className = "stepone">  <div  className = 'wrapper'> <img src = './Images/1.png' />  </div>
     Create Your Free Account
     </div>
     <div className = "stepone">  <div  className = 'wrapper'> <img src = './Images/2.png' />  </div>
     Step Up Your Experience
     </div>
     <div className = "stepone">  <div  className = 'wrapper'> <img src = './Images/3.png' />  </div>
     Start  Trading Instantly
     </div>
    </div>
     </div>
    </div>
    )
}

export default Reasons
