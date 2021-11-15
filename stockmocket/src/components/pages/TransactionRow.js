import React, { Component } from "react";

class TransactionRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
        }
    }
    componentDidMount() {
        
    }

    render() {
        return (
            <tr className="tabledesign">
                <td> {this.props.transDate} </td>
                <td> {this.props.orderType} </td>
                <td> {this.props.buysell} </td>
                <td> {this.props.effect} </td>
                <td className="cellcolor"> {this.props.ticker} </td>
                <td className="numbers"> {this.props.stock_amount} </td>
                <td className="numbers"> {this.props.prices} </td>
            </tr>
        )
    }

}

export default TransactionRow; 

/*
result += "<tr>";
            //trans date
            result += "<td>";
            result += transDate[i];
            result += "</td>";
            //order type
            result += "<td>";
            result += orderType[i];
            result += "</td>"
            //buysell
            result += "<td>";
            result += buysell[i];
            result += "</td>";
            //effect
            result += "<td>";
            result += effect[i];
            result += "</td>";
            //ticker
            result += "<td>";
            result += ticker[i];
            result += "</td>"
            //stock amount
            result += "<td>";
            result += stock_amount[i];
            result += "</td>"
            //prices
            result += "<td>";
            result += prices[i];
            result += "</td>";
                        
            result += "</tr>";
*/
