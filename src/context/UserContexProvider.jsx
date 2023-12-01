import React,{useState} from "react";
import UserContext from "./UserContext";
// const UserContext = createContext();
const UserContextProvider =({children})=>{
    // const [user, setUser] = useState(null);
    const [user,setUser]=useState(null)
    const [token,setToken]=useState(null)
    const [selectedMovies, setSelectedMovies] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
    return(
        <UserContext.Provider value={{user,setUser,token,setToken,selectedMovies, setSelectedMovies, totalPrice, setTotalPrice}}>
            {children }
        </UserContext.Provider>
    )
}
export default UserContextProvider;
