
import React, {Component,} from "react";
import iex from './iexapitoken.js'
import "./usermarketpage.css"


var user = "brian";
var currentbal = "7564"
var key1 ="tsla"
var key = "";
var logo1 = '';
var s ='';

const BarStyling = {width:"40rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};


class usermarketpage extends Component{
    constructor(props) {
        super(props);
        this.state = {
           data: {}, logo: [], info:{}, value: ''
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
                <h1> Hello {user} </h1>
                <h1> Current Balance is $ {currentbal}</h1>
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
                    Title {this.state.data.companyName}
                    <br />
                    price  {this.state.data.high} ### ###
                    <br /> 
                    ### ### ###
                    <br /> 
                    ### ### ###
                </div>
                <div className="stockbutton">

                </div>
                </div>
                <div className="stockdescription">
                    <h1>  
                        {this.state.info.description}
                    </h1>
                </div>
           </div>
        </div>
    )
}
}
export default usermarketpage;
