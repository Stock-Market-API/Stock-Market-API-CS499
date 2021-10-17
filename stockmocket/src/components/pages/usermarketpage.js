
import React, {Component,} from "react";
import iex from './iexapitoken.js'
import "./usermarketpage.css"


var user = "brian";
var currentbal = parseFloat("1540.547892")
var key1 ="tsla"
var key = "";
var logo1 = '';
var s ='';

const BarStyling = {width:"40rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};


class usermarketpage extends Component{
    constructor(props) {
        super(props);
        this.state = {
           data: {}, logo: [], info:{}, value: 'tsla'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
  
    handleSubmit(event) {
    this.componentDidMount();
      event.preventDefault();
      console.log(this.state.value);
    }
 

        
componentDidMount() {
        key = this.state.value.toString();
        console.log(key)
        const url = `${iex.base_url}/stock/${key}/quote/?&token=${iex.api_token}`
        const urltwo = `${iex.base_url}/stock/${key}/company/?&token=${iex.api_token}`
        const urlthree = `${iex.base_url}/stock/${key}/logo/?&token=${iex.api_token}`
        
        Promise.all([fetch(url), fetch(urltwo) ,fetch(urlthree)]).then(([res1, res2, res3]) => { 
            return Promise.all([res1.json(), res2.json(), res3.json()]) 
         })
         .then(([res1, res2, res3]) => {
            logo1 = (res3.url); 
             s = logo1.toString();
             console.log(res1)
             console.log(res2)
           this.setState({
               data : res1,
               info : res2,
               logo : res3
           })
         });
    }
render() {
    return(
        <div className="uncontainer">
            <div className ="usergreeting">
                <h1 className = "namedesc"> Hello {user} </h1>
                <h1> Current Balance is $ {currentbal.toFixed(2)}</h1>
            </div> 
            <div className="searchbar">
            <form onSubmit={this.handleSubmit}>
          <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
          
            
            </div>
           <div className="stockinfodisplay">
                <div className="stockinfocenter">
                <div className="stocklogo">
                        <img src={s} />
                </div>
                <div className="stockinfo">
                    Company Name: {this.state.data.companyName}
                   <div className="tableinfo">
                   <table class="wp-table">
                         <tr>
                    <th className = "tablenamestyling">Industry :  <p1 className ="companyname">  {this.state.info.industry} </p1></th>
                         <th className = "tablenamestyling">CEO :  <p1 className ="companyname"> {this.state.info.CEO} </p1></th>
                        <th className = "tablenamestyling" >Sector : <p1 className ="companyname">  {this.state.info.sector} </p1> </th>
                        </tr>
                     <tr>
                 <td className = "tablenamestyling">Price  $ <p1 className ="numbers"> {this.state.data.latestPrice} </p1> </td>
                <td className = "tablenamestyling" >High $  <p1 className ="numbers">{this.state.data.high} </p1> </td>
                    <td className = "tablenamestyling" >Low $  <p1 className ="numbers"> {this.state.data.low} </p1></td>
                </tr>
                 <tr>
                     <td className = "tablenamestyling" >Volume : <p1 className ="numbers">{this.state.data.volume} </p1> </td>
                      <td className = "tablenamestyling" > Week-52 High $ <p1 className ="numbers">{this.state.data.week52High} </p1> </td>
                    <td className = "tablenamestyling" >Week-52 Low $ <p1 className ="numbers">{this.state.data.week52Low} </p1></td>
                 </tr>
                     <tr>
                 <td className = "tablenamestyling" > MarketCap : <p1 className ="numbers">{this.state.data.marketCap} </p1> </td>
                 <td className = "tablenamestyling"  >  Daily Change  $ <p1  style= {{color: Math.sign(this.state.data.change) == -1 ? "red" : "green"}}>  <p1 className ="numbers"> {this.state.data.change} </p1></p1> </td>
                    <td className = "tablenamestyling" >YTD-Change : <p1  style= {{color: Math.sign(this.state.data.ytdChange) == -1 ? "red" : "green"}}> <p1 className ="numbers">{this.state.data.ytdChange} % </p1> </p1></td>
    </tr>
  </table>
                   </div>
                </div>
                <div className="stockbutton">
                        <p1> buy button underworks</p1>
                </div>
                </div>
                <div className="stockdescription">
                <div className ='maxstockdescription'> 
                <h1>"
                    <p1 className ="descfont">  
                        {this.state.info.description}
                        
                    </p1>
                   " </h1>
                    </div>
                   
                </div>
                <div className = "newcycle">
                    <h1> NEW CYCLE UNDERWORKS</h1>
                        <h1>  homas Edward Patrick Brady Jr. is an American football quarterback for the Tampa Bay Buccaneers of the National Football League. He spent his first 20 seasons with the New England Patriots, where he was a central contributor to the franchise's dynasty from 2001 to 201 </h1>
                        </div>
           </div>
           
        </div>
    )
}
}
export default usermarketpage;
