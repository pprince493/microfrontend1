import React from "react";
import Grid from "@mui/material/Grid";
import "../assets/css/welcome.css";
import Creator_Blocks from "../assets/build 1.png";
import Flash_Blocks from "../assets/application 1.png";
import nagarro_img from "../assets/N.png";
import { useNavigate } from 'react-router-dom';
import Header from "./Header/Header";


export default function Welcome() {
  const navigate = useNavigate();

  const handlesubmit = () => {
    navigate('/productdetails');
}



  return (
    <div container className="welcomeContainer">
      <div className='header'><Header /></div>

      <div className="appplicationOpption">
        <Grid md={11} container className="welcomerootGrid">
          <Grid className="welcomerightContainer">
            <Grid>
              <div className="welcome">
                <div>
                  <h1>Welcome </h1>
                </div>
                <div className="title">
                  <p>Do you want to use the existing or build your own.</p>
                </div>
              </div>
            </Grid>
            <Grid className="options">
              <table className="optionstable">
                <tr>
                  <button className="option">
                    <img
                      src={Creator_Blocks}
                      className="creator_Blocks"
                      alt=""
                    />

                    <a className="c_Block">App Builder</a>
                  </button>
                </tr>
                <span class="dotted-line">Or</span>
                <tr>
                  <button className="option" onClick={handlesubmit}>
                    <img src={Flash_Blocks} className="flash_Blocks" alt="" />

                    <a className="f_Block">Super App</a>
                  </button>
                </tr>
                <span class="dotted-line">Or</span>
                <tr>
                  <button className="option">
                    <a className="Track">Track Application</a>
                  </button>
                </tr>
              </table>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
