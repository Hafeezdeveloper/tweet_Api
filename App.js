import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomTabs from "./Pages/Project";
import CustomProgressBar from "./Pages/Project";
import { getApi } from "./Api/BaseMethod";
import InfiniteScroll from "react-infinite-scroller";
import { Box, Typography } from "@mui/material";


// const stringHash = require("string-hash");
// const Joi = require('joi');
// const moment = require("moment");
// const modelTweet = require("../Models/TweetSchema");
      //api for tweeter
// routers.get('/tweet/user', async (req, res) => {
//     //here  /:getUser ==> this is for just showing purpose 
//     try {
//         let page = req.query.page || 0
//         console.log(page)
//         let result = await modelTweet.find().sort({_id: -1}).skip(page).limit(5)
//         // console.log("page" , page)
//         // console.log("result" , result)
//         if (!result) {
//             res.send(sendResponse(false, result, "result Not Found", "error")).status(200)
//         } else {
//             res.send(sendResponse(true, result, "result Found", "sucess")).status(200)
//         }
//     } catch (err) {
//         console.log(err)
//     }
//   })


function App() {
  
      // Bussies account client id  rakhey ge
//   const initialOptions = {
//     'client-id': 'AXOgZS2WuX6QlC0_ZiVwsJWcGsjH6ZkRPCSQqs1aRg_Zui6Oq7wkOOExqT4f68oyjHEJIWhXNKOjUTtt', // Replace with your PayPal client ID
//     currency: 'USD',
    
// };


// // ======It give an error agr hum buissens account sy pay karey ge tu hamey personal ak or bana hoga==


// const createOrder = (data, actions) => {
//   return actions.order.create({
//       purchase_units: [
//           {
//               amount: {
//                   value: '10.00', // Replace with your desired amount
//               },
//           },
//       ],
//   });
// };


// // ======It give an error agr hum buissens account sy pay karey ge tu hamey personal ak or bana hoga==
//   const onApprove = (data, actions) => {
//   return actions.order.capture().then(async function (details) {
//       // Handle the successful payment
//       console.log('Payment successful', details);

//       // Make a POST request to your Express.js backend to create a payment
//       try {
//           const response = await axios.post('http://192.168.0.101:5000/pay', {
//               name: 'Item Name', // Provide the necessary data
//               description: 'Description of the item', // You may need to adapt this to your actual data
//           });
//           console.log('Payment created in the backend:', response.data);
//       } catch (error) {
//           console.error('Error creating payment:', error);
//       }
//       console.log(data)
//       console.log(actions)
//       console.log(actions)
//         window.location.href = `${data}`
//   });
// }
// console.log(moment("2023-11-04T07:12:56.035+00:00"))



// const timestamp = "2023-11-04T07:12:56.035+00:00";
// const formattedDate = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
// const relativeTime = moment(timestamp).fromNow();
// console.log("Formatted Date:", formattedDate);
// console.log("Relative Time:", relativeTime);


  const [page,setPage] =useState(false)
  const [arr,setArr] =useState([])
  const [end,setEnd] =useState(false)


  let func = async () => {
    if(end)  return  
    try {
      const response = await axios.get(`http://192.168.1.105:5000/api/admin/tweet/user?page=${arr.length}`);
      // console.log(); // API response data
      
      if(response.data.data.length == 0)  {setEnd(true)}
      setArr((pre) => {
       return [ ...arr,...response.data.data]
      })
      // Handle response data here
    } catch (error) {
      console.error(error); // Log any errors if the request fails
    }
  };
  
  useEffect( () =>{
    func()
  },[page])
  

  return (
    <>

      <Typography variant="h4" style={{display:"flex" , justifyContent:"center"}}>Tweets </Typography>
<Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={func}
        hasMore={!end}
        loader={<div className="loader" key={0}>Loading ...</div>}
        style={{

          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        {arr.map(item => (
          <div
            key={item._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
            className="shadow m-3 pt-3 "
          >
            <div>
              <strong>{item.name}</strong>
              <p>{item.tweetText}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </Box>

    {/* <CustomProgressBar/> */}
    
{/*   
<div className="App">
            <h1>Pay with PayPal</h1>
            <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
        </div> */}
    </>
  );
}

export default App;
