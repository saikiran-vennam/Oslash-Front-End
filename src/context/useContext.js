import { useState , createContext , useContext} from "react";
import p1 from "../images/p1.png"
import p2 from "../images/p2.png"
import p3 from "../images/p3.png"
import E from "../images/Eng.png";
import P from "../images/product.png"

export const myContext=createContext();
export const ContextProvider=(props)=>{
    const members=[
        {
            name:"Arlene Mccoy",
            email:"arlen@gmail.com",
            profileImg:p1,
            access:"No access"
           
        },
        {
            name:"jhon",
            email:"jhon@gmail.com",
            profileImg:p2,
            access:"No access"

        },
        {
            name:"tom cook",
            email:"tomcook@gmail.com",
            profileImg:p3,
            access:"No access"

        }
    ]
    const groups=[
        {   
            profileImg:E,
            branch:"Engineering",
            access:"No access"
        },
        {   
            profileImg:P,
            branch:"Product",
            access:"No access"
        }
    ];
const [grouplist,setGrouplist]=useState(groups);
const [selectedUser,setSelectedUser]=useState([]);
const [memberslist,setMemberlist]=useState(members);
const [isselect,setIsselect]=useState(false);
    return(<myContext.Provider value={{memberslist, setMemberlist, selectedUser, setSelectedUser, grouplist, setGrouplist, isselect,setIsselect}}>{props.children}</myContext.Provider>)
} ;

export function useMyContext() {
     const context = useContext(myContext);
     if (context === undefined) {
       throw new Error("Context must be used within a Provider");
     }
     return context;
   }