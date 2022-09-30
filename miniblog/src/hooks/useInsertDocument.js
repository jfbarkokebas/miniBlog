import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

//objeto que ira ser o valor inicial do state do reducer
const initialState = {
    loading: null,
    error: null
}

//função que controla a variavel do reducer
const insertReducer = (state, action) =>{

    switch(action.type){

        case 'LOADING':
            return {loading: true, error: null}

        case 'INSERTED_DOC':
            return {loading: false, error: null}

        case 'ERROR':
            return {loading: false, error: action.payload}

        default:
            return state

    }

}

export const useInsertDocument = (docCollection)=>{
    //instanciando o reducer que vai evitar loadings e errors no começo:
    const [response, dispatch] = useReducer(insertReducer, initialState)

    //deal with memory leak:
    const [cancelled, setCancelled] = useState(false)

    //DISPATCH
    const checkCancelledBeforeDispatch = (action)=>{ //action: {type: "tipo", payload: actionTypeFunction}
        if(!cancelled){
            dispatch(action)
        }
    }

    const insertDocument = async (document) =>{
         
         checkCancelledBeforeDispatch({
            type:"LOADING",
            
        })

        try {

            // 1 - pego o doc que vai ser inserido:
            const newDocument = {...document, createdAt: Timestamp.now()}
            // 2 - payload:
            const insertedDocument = await addDoc(
                collection(db, docCollection ),//vai procurar no BD a coleção passada como argumento da função
                newDocument      //se achar a collection inseri o novo documento
            )
           
            checkCancelledBeforeDispatch({
                type:"INSERTED_DOC",
                payload: insertedDocument
            })
            
        } catch (error) {
            
             checkCancelledBeforeDispatch({
                type:"ERROR",
                payload: error.message
            })
            
        }
    }

    useEffect(()=>{
        return ()=> setCancelled(true) 
    },[])

    return {insertDocument, response}

}