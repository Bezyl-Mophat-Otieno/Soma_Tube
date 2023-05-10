import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format, render, cancel, register } from 'timeago.js';
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../modules.js";
import {} from '../redux/videoSlice.js'
const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
//TODO install timeago.js

const Card = ({ type,video }) => {
  
  const [channel,setChannels] = useState([])
  useEffect(()=>{

    const fetchChannels =async ()=>{
      const res =await axios.get(`${serverUrl}users/find/${video.userId}`)
      setChannels(res.data)
    }
    fetchChannels()

  },[video.userId])

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imageUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.image}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
