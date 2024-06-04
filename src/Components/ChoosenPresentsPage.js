/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";

let ChoosenPresentsPage = (props) => {
    let {createNotification} = props

    let [chosenPresents, setChosenPresents] = useState([])
    let [message, setMessage] = useState(null)
    
    useEffect(() => {
        fetchChosenPresents()
    }, [])

    const fetchChosenPresents = async () => {
        try {
            let response = await fetch(backendUrl + "/presents?myPresents=" + true
                + "&apiKey=" + localStorage.getItem("apiKey"), {
                    method: "GET",
                    headers: {"Content-Type" : "application/json"}
            })

            if (response.ok) 
            {
                let data = await response.json()

                if(data.length > 0)
                {
                    setChosenPresents(data)
                    createNotification("Presents found")    
                }   
                else
                {
                    createNotification("No presents choosed")
                }
            } 
            else 
            {
                const jsonData = await response.json()
                setMessage(jsonData.error)
            }
        } 
        catch (error) 
        {
            setMessage(error.message)
        }
    }

    return (
        <div>
            <h2>My Presents</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}

            <div className="item-list">
                {chosenPresents.map ( present => 
                    (
                        <div className="item">
                            <h3 className="name">{present.name}</h3>
                            <h3 className="description">Description: {present.description}</h3>
                            <h3 className="url">URL: {present.url}</h3>
                            <h3 className="price">Price: {present.price} €</h3>
                            <h3 className="choosenBy">
                                Choosen by: {present.choosenBy === "" 
                                    || present.choosenBy == null ? "No one" : present.choosenBy} </h3>   
                            <h3 className="listId">List Identifier: {present.listId}</h3>                                 
                        </div>                                      
                    )
                )}
            </div>
        </div>
    )
}

export default ChoosenPresentsPage