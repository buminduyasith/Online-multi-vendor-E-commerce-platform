import React from 'react'
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";


const override = css`
  display: block;
  margin: 50px auto;
  border-color: red;
`;
 

function Loding() {
    return (
        <div className="Loading d-flex justify-content-center ">

           
                <h5>please wait...</h5>
                <DotLoader
                css={override}
                size={100}
                color={"#123abc"}
                
            />
           

            
            
        </div>
    )
}

export default Loding
