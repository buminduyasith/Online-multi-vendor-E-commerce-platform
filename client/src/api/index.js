
import axios from 'axios';

const url = 'http://localhost:8082/products';

export const fetchData = async () =>{

   try{
        
        const {data} =await axios.get(url);
        //console.log(data);

        return data;

   }catch(error){
    console.log(error);
   }

}