import React, {Component} from "react";
import iex from './iexapitoken.js'
import './MockData.css';

var latestime;
var d ;
var t;
class StockRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
           data: {},
        }
    }
componentDidMount() {
    const url = `${iex.base_url}/stock/${this.props.ticker}/quote/?&token=${iex.api_token}`

    fetch(url).then((Response) => Response.json()).then((data)  => {
        console.log(data)
      
       latestime = (data.latestUpdate) 
       t = new Date(latestime).toLocaleTimeString("en-US")
       d = new Date(latestime).toLocaleDateString("en-US")
        this.setState({
           data: data
           
        })
    })
   
}

render (){
    return (
            <tr className = "tabledesign">
               
                <td className = "cellcolor"> {this.props.ticker} </td>
                <td className = "companyname" > {this.state.data.companyName} </td>
                <td className = "numbers"> $  {this.state.data.latestPrice} </td>
                <td  className = "numbers" > $ {this.state.data.open} </td>
                <td   className = "numbers"> $ {this.state.data.previousClose} </td>
                <td  className = "numbers"  style= {{color: Math.sign(this.state.data.changePercent) == -1 ? "red" : "green"}}> {this.state.data.changePercent} </td>
                <td  className = "numbers"> {t + " " + d} </td>
                
            </tr>

    )
}

}

export default StockRow;