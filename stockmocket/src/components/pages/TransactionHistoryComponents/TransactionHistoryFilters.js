import React, { useState } from "react"
import "./TransactionHistoryFilters.css"


const TransactionHistoryFilters = ({onFilter}) =>{

    const [filterDeposit, setFilterDeposit] = useState(false)
    const [filterWithdraw, setFilterWithdraw] = useState(false)
    const [filterBuy, setFilterBuy] = useState(false)
    const [filterSell, setFilterSell] = useState(false)
    const [filterStock, setFilterStock] = useState(false)
    const [filterStockText, setFilterStockText] = useState("")


    const onSubmit = (e) =>{
        e.preventDefault()
        
        if(filterStock && filterStockText === ""){
            alert("Please don't fortget to add a stock ticker")
            return
        }

        onFilter(filterDeposit, filterWithdraw, filterBuy, filterSell, filterStock, filterStockText)

        setFilterDeposit(false)
        setFilterWithdraw(false)
        setFilterBuy(false)
        setFilterSell(false)
        setFilterStock(false)
        setFilterStockText("")
    }

    return(
        <div> 

            <form className="filter-form" onSubmit={onSubmit}>
            <h2> Filters </h2>
            <div className="filter-form-block">
                <div>
                    <label> Deposits </label>
                    < input type = "checkbox" value = {filterDeposit} 
                    onChange={(e) => setFilterDeposit(e.currentTarget.checked)}
                    checked={filterDeposit}
                    disabled={filterStock}
                    />
                </div>

                <div>
                    <label> Withdrawals </label>
                    < input type = "checkbox" value = {filterWithdraw} 
                    onChange={(e) => setFilterWithdraw(e.currentTarget.checked)}
                    checked={filterWithdraw}
                    disabled={filterStock}
                    />
                </div>

                <div>
                    <label> Buy </label>
                    < input type = "checkbox" value = {filterBuy} 
                    onChange={(e) => setFilterBuy(e.currentTarget.checked)}
                    checked={filterBuy}
                    />
                </div>

                <div>
                    <label> Sell </label>
                    < input type = "checkbox" value = {filterSell} 
                    onChange={(e) => setFilterSell(e.currentTarget.checked)}
                    checked={filterSell}
                        />
                </div>

            </div>   
            <div className="filter-form-block-stock">
                <div>
                    <label> Stock </label>
                    < input type = "checkbox" value = {filterStock} 
                    onChange={(e) => {
                        setFilterStock(e.currentTarget.checked)
                        setFilterWithdraw(false)
                        setFilterDeposit(false)
                        setFilterStockText("")
                    }
                     }
                     checked={filterStock}
                     />
                </div>

                {filterStock && <div>
                    <label> Name of Stock </label>
                    < input type = "text" placeholder="Input the stock's ticker symbol" value={filterStockText}
                    onChange={(e) => setFilterStockText(e.target.value)}/>
                </div>}

            </div>  

                <input type = "submit" value = "Filter History"></input> 

            </form>
        </div>
    )
}

export default TransactionHistoryFilters