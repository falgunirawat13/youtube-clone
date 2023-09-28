import { useState,useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography,Box,Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {Videos} from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setvideoDetail] = useState(null)
  const [videos, setvideos] = useState(null);
  const { id }=useParams();
  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data)=>setvideoDetail(data.items[0]));
    fetchFromAPI(`search?part=snippet&relatedTovideoId=${id}&type=video`)
    .then((data)=>setvideos(data.items));
  },[id]);
  return (
    <Box minHeight='95vh'>
      <Stack direction={{xs:'column' , md:'row'}}>
        <Box flex={1}>
          <Box sx={{width:'100%',position:'static'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}` }
            className="react-player" controls />
           {videoDetail && (
              <Typography variant="h5" color="#fff" fontWeight="bold" marginTop={2} align="center">
                {videoDetail.snippet.title}
              </Typography>
            )}
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center'>
      {videos && <Videos videos={videos} direction="column" />}
     </Box>

      </Stack>
      
    </Box>
  )
}

export default VideoDetail