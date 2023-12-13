import app from './mainConf'
import { getDatabase ,ref, set, push, onChildAdded ,onValue, onChildAdded, remove } from "firebase/database";

const db = getDatabase(app)

let sendDataBase = (nodeName,obj,id) =>{
    return new Promise( (resolve,reject) =>{
        let reference = ref(db,`${nodeName}/`)
        obj.id = push(reference).key

        let refer = ref(db,`${nodeName}/${obj.id}`)
        set(refer,obj)
        .then( (succ) =>{
            resolve(succ)
        })
        .catch( (err) =>{
            reject(err)
        })
    })
}


let getDatabase = (nodeName, obj) =>{
    return new Promise( (resolve,reject) =>{
        let referen = ref(db,`${nodeName}`)
        onChildAdded(referen , (data) =>{
            if(data.exists()){
                resolve(data.val())
            }
            
        })
    })
}

let getDelete = (nodeName, obj) =>{
    return new Promise( (resolve,reject) =>{
        let referen = ref(db,`${nodeName}/${obj.id}`)
        remove(referen)
        .then( (succ) =>{
            resolve( "succesfuuly delete")
        })
        .catch( (err) =>{
            reject(err)
        })
    })
}

export {sendDataBase,getDatabase,getDelete}