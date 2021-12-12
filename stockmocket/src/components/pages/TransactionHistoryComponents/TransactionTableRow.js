import { Link } from "react-router-dom";
const TransactionTableRow = ({transaction}) => {
    // console.log(transaction)
    return(
        <tr className="chartdesign"> 
        <td>{transaction.date}</td>
        <td>{transaction.orderType}</td>
        <td>{transaction.buySell}</td>
        <td>{transaction.Effect}</td>
        <td className="cellcolor"> 
            <Link to={{
                        pathname: '/usermarketpage',
                        state: {value: transaction.Security}
                    }} className="cellcolor"> {transaction.Security} </Link> </td>
        <td className="numbers">{transaction.Amount}</td>
        <td className="numbers">{transaction.Price}</td>
    </tr>
    )
}



export default TransactionTableRow