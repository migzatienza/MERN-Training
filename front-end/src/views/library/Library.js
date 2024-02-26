import React, { useEffect, useState } from "react"
import AddEditLibrary from "./AddEditLibrary"

const Library = ()=>{      

    const [page_tab, setTabs] = useState(0)
    const [bookList,setBookList] = useState([])

    const [form,setForm] = useState({
        book_name:"",
        author:""
    })     

    useEffect(()=>{
        console.log(form)
    },[form])

    
    function updateForm(key,e){
        const value = e.target.value;
        setForm({
            ...form,
            [key]: value
        })
    }

    function addToList(){
        var _tempbookList = bookList
        _tempbookList.push(form)
        setForm({
            book_name:"",
            author:""
        })
        setBookList(_tempbookList)

    }

    function displayBookList(){
        
        return(<table>
            <tr>
                <th>Book Name</th>
                <th>Author</th>
            </tr>
            {
                bookList.map(element =>{
                    return (
                        <tr>
                            <td>{element.book_name}</td>
                            <td>{element.author}</td>
                        </tr>
                    )
                    
                    
                })
            }
        
        </table>)
    }


    return(
    <div className="ml-4">
        This is a library 
        <br></br>
        <button onClick={()=>{setTabs(0)}}>
            Book List
        </button>
        
        <button className="ml-2" onClick={()=>{setTabs(1)}}>
            Add Book
        </button>
        
        <br></br>
        {
            page_tab == 0
            ?
            displayBookList():
            null
        }
        {
             page_tab == 1?
                <AddEditLibrary form ={form} updateForm ={updateForm} addToList = {addToList} />
                :
                null

        }

    </div>
    )
}

export default Library