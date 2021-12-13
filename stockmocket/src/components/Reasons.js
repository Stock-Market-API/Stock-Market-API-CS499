import React from 'react'
import './Reasons.css'
function Reasons() {
    return (
        <div>
        <div className ="lp1container1">
        <div className = "lptitle"> <h1> Why Stock Mocket?</h1></div>
        <div className = "lpreasons"> 
        <div className = "lpreasonbox"> 
       <div>  <img src='https://cdn-icons-png.flaticon.com/512/1035/1035311.png' width="128" height="128" className = "iconsize"/> </div> 
       <div className = "titledesc"> <h1> Secure </h1>  </div> 
        <div className = "desc" > Trade with confidence knowing that your data is secure.</div>
         </div>
        <div className = "lpreasonbox">
        <div>  <img src='https://cdn1.iconfinder.com/data/icons/transport-1-12/52/82-512.png' width="128" height="128" className = "iconsize"/> </div> 
        <div className = "titledesc"><h1> Fast </h1>  </div> 
        <div className = "desc" > Power by Industry Leading Data </div></div>
        <div className = "lpreasonbox"> 
        <div>  <img src='https://images-ext-2.discordapp.net/external/Va2YcKO_ttDsQskpR222UGP17cfFomC-f47Rb9MKgUM/https/image.flaticon.com/icons/png/512/1007/1007924.png' width="128" height="128" className = "iconsize"/> </div> 
        <div className = "titledesc"><h1> Free </h1>  </div> 
        <div className = "desc"> Risk Free Trading. Why risk your hard own money</div></div>

        </div>
        
    </div>
    <div className ='lpcontainer2'>  
    <div className = "box1"> <img src =" ./Images/reasons.png" /> </div>
    <div className = "box2">  
    <h1> Trade with Confidence </h1>
    <div className= 'box3'> Over the past two years, if we’ve learned anything, it is that people suckat investing. Many individuals blew their Covid-relief money on stocks that tanked. Others threw their hopes into stocks that grew rapidly near the end of quarantine, but later tanked because they didn’t realize they had to sell their stock afterwards. 
As more people are indulged with trading stocks, there is need to educate those on properly trading stocks. We envision a web-app that will properly teach such individuals on the basics of stock trading using fake money so users can freely experiment with trading without risking real income.
</div>
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