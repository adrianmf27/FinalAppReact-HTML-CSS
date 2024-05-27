/* eslint-disable eqeqeq */
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { backendUrl } from "../Globals"

let MyPresentsComp = (props) => {
    let {createNotification} = props

    let [presents, setPresents] = useState([])
    let [message, setMessage] = useState("")

    let navigate = useNavigate()

    useEffect(() => {
        //getPresens();
    }, [])

    /*let getPresens = async () => {
        let response = await fetch(backendUrl + "/presents?apiKey=" + localStorage.getItem("apiKey"), {
            method: "GET",
            headers: {"Content-Type" : "application/json"}
        })
    
        if(response.ok)
        {
            let jsonData = await response.json()
            setPresents(jsonData)
        }
        else
        {
            setMessage("Error obtaining items")
        }
    }*/

    let onClickDeleteItem = async (id) => {
        let response = await fetch(backendUrl + "/presents/" + id + "?apiKey=" 
            + localStorage.getItem("apiKey"), { method : "DELETE" })
        
        if(response.ok){
            let updatedPresents = presents.filter(present => present.id != id)
            setPresents(updatedPresents)
            createNotification("Present succesfully deleted")
        }
        else
        {
            let jsonData = await response.json()
            setMessage(jsonData.error)
        }
    }

    let onClickEditItem = async (id) => {
        navigate("/present/edit/" + id)
    }

    return (
        <div>
            <h2>My Presents</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}

            <div className="item-list">
                { presents.map (present => 
                    (
                        <Link to={"/present/" + present.id} key={present.id}>
                           <div className="item">
                                <h3 className="name">{present.name}</h3>
                                <h3 className="description">Description: {present.description}</h3>
                                <h3 className="url">URL: {present.url}</h3>
                                <h3 className="price">Price: {present.price}</h3>
                                <h3 className="choosenBy">Choosen by: {present.choosenBy}</h3>
                                <button onClick={() => {onClickDeleteItem(present.id)}}>Delete Item</button>
                                <button onClick={() => {onClickEditItem(present.id)}}>Edit Item</button>
                            </div>      
                        </Link>                                          
                    )
                )}
            </div>
        </div>
    )
}
export default MyPresentsComp;