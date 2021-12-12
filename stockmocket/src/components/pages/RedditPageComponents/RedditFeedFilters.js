import React, { useState } from "react"
import DButton from "../DButton"
import "./RedditPage.css"


const RedditFeedFilters = ({OnSearch, OnHot, OnNew, OnTop}) =>{

    const [searchText, setSearchText] = useState("")

    const onSubmit = (e) =>{
        e.preventDefault()

        if(!searchText){
            alert("Please type in Search")
            return
        }

        OnSearch(searchText)

        setSearchText("")
    }

    return(
        <div className = "filtercontainer">
            <form className="add-form" onSubmit={onSubmit}>
                <div className = "form-control">
                    <label> Search through r/WallStreetBets </label>
                    <input
                        type = "text"
                        placeholder = "Search for a stock"
                        value = {searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <input type='submit' value='Search' className='Dbtn btn-block' />
            </form>
            <div>
                <DButton color ="red" text="Hot" onClick = {OnHot}/>
                <DButton color ="blue" text="New" onClick = {OnNew}/>
                <DButton color ="green" text="Top Monthly" onClick = {OnTop}/>
            </div>

        </div>
        
    )
}

export default RedditFeedFilters