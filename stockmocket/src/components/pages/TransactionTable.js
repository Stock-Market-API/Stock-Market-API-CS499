import TransactionTableRow from "./TransactionTableRow"


const TransactionTable = ({tHistory}) =>{
    // console.log(tHistory)
    
    return(

        <table className="table">
            <thead>
                <tr>
                    <th className="publicsans"> Time Placed </th>
                    <th className="publicsans"> Order Type </th>
                    <th className="publicsans"> Buy/Sell </th>
                    <th className="publicsans"> Effect </th>
                    <th className="publicsans"> Security </th>
                    <th className="publicsans"> Amount </th>
                    <th className="publicsans"> Price </th>
                </tr>
            </thead>
            <tbody>

                {tHistory.map((transaction, index) => (
                    <TransactionTableRow key={index} transaction={transaction}/>
                ))}
                
            </tbody>
        </table>
    )
}


export default TransactionTable