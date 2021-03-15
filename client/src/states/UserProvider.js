import React,{ useContext,useEffect,useState } from "react";
import axios from 'axios'
import  { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";




const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({children}){

    const[currentUser,setCurrentUser] = useState({

    });

    const[Loginerror,setLoginerror] = useState(false);

    

    
    const history = useHistory();

    const userPrefix = "online-shop-current-user"

    useEffect(() => {
        
        console.log("hi im mounted authprovider");
        console.log(localStorage.getItem(userPrefix));

        if( localStorage.getItem(userPrefix)==null){
            console.log("not found");
           
        }
        else{
            console.log("found");
            
        }

        /*return () => {
            cleanup
        }*/

    }, [])

    function signup(user){

        setLoginerror(false);
        //rangana@gmail.com  yasith bumiduyasith@gmail.com Bumi68@ minijamigara@gmail.com
        //pwd Byr123@

        axios.post('http://localhost:8081/login', {
                username: user.username,
                password:user.password
              })
              .then(function (response) {

               
                var res = response.headers.authorization;
               
                var token = res.split(" ");
               
    
                var payload = jwt_decode(token[1]);

                console.log("res"+res);
                console.log(payload);
                console.log(payload.authorities[0].authority);

                setCurrentUser({
                    ...currentUser,
                    authorizationjwtket:res,
                    authorities:payload.authorities[0].authority,
                    sub:payload.sub
                }
                );

                if(payload.authorities[0].authority==="SELLER"){
                    console.log("if SELLER");
                        history.push("/seller/dashboard");
                }
                else if(payload.authorities[0].authority==="CUSTOMER"){
                    console.log("if CUSTOMER");
                    history.push("/customer/dashboard");
                }
        
              
               
               
          
                
              })
              .catch(function (error) {
                console.log("error");

                setLoginerror(true);
                setTimeout(() => {
                    setLoginerror(false);
                }, 6000);
               
           
               // console.log(error.response);
              });
          
        
    }
    
    function signout(){
    
       
        setCurrentUser("");
        history.push("/");
    }
    

    

    const value = {
        currentUser,
        signup,
        signout,
        setCurrentUser,
        Loginerror,
        setLoginerror

    }
    
    return(
        <AuthContext.Provider value= {value}>
            {children}
        </AuthContext.Provider>
    )

}

