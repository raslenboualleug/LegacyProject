import React from "react";
import {Button } from '@mui/material'
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';

export default function  ScrollToTop (){

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };
  return (
    <Button
        onClick={scrollToTop}
        style={{
          marginBottom: "50px",
          bottom: "20px",
          right: "20px",
          backgroundColor: "white",
          borderRadius: "50%",
          padding: "10px",
          minWidth: "auto",
          float:"right"
        }}
      >
        <ArrowCircleUpOutlinedIcon style={{ fontSize: "50px", color: "#000" }} />
      </Button>
  )
}