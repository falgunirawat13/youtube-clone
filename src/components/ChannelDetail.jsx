import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos } from './';
import {ChannelCard} from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setchannelDetail] = useState(null);
  const [videos, setvideos] = useState([]);
  const {id }=useParams();

  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setchannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setvideos(data?.items));
  },[id])
  return (
    <Box minHeight="95vh">
     <Box>      
      <div style ={{
        background : 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
        zIndex:10,
        height:'300px'        
      }}
      />  
      <ChannelCard channelDetail={channelDetail} marginTop="-93px"/>              
      </Box> 
      <Box display='flex' p='2'>
        <Box sx={{mr:{sm:'100px'}}}>
        </Box>
          <Videos videos={videos} />
        

      </Box>
    </Box>
  )
}

export default ChannelDetail