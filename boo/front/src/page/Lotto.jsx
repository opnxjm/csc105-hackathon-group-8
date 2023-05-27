import React, { useState, useEffect } from "react";
import NavBar from "../component/Navbar";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import "./Lotto.css";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "250px",
  border: "solid 1px transparent",
  borderRadius: "20px",
};

function Lotto() {
  const [counter, setCounter] = useState(Math.round(Math.random() * 100));
  const [lottoData, setLottoData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const lotto = counter;


  useEffect(() => {
    // Fetch lotto data when the component mounts
    fetchLottoData();
  }, [open]);
  // const handleAdd = async () => {
  //   try{
  //     const response = await axios.post(`http://localhost:8888/`)
  //   }
  // }
  const fetchLottoData = async () => {
    // setCounter(Math.round(Math.random() * 100));
    try {
      const random = Math.round(Math.random() * 100);
      const data = await axios.get(`http://localhost:8888/lotto/${random}`);
      // console.log("DATA => ");
      // console.log(data);
      if (data.data.success) {
        setLottoData(data.data.lotto[0]);
        // console.log("Debug => ");
        console.log(lottoData);
      } else {
        // Handle error response
        // console.log(response.data.message);
      }
    } catch (error) {
      // Handle network or server error
      console.error("Error fetching lotto data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(lotto);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="allPage">
      <NavBar />
      <Box sx={{ height: "100px" }}></Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
      >
        <Grid item md={6}>
          <Box className="ghostImage">
            <img src="../ghost.png" alt="little ghost"></img>
          </Box>
        </Grid>
        <Grid item md={6}>
          <div>
            <Button
              style={{
                backgroundColor: "black",
                border: "none",
                color: "white",
                padding: "15px 40px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "1rem",
                margin: "4px 2px",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Rubik",
              }}
              onClick={handleOpen}
            >
              Random
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-description"
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  {lottoData.lottoNumber}
                </Typography>

                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <h3 style={{ fontFamily: "Rubik" }}>Meaning</h3>
                    <p style={{ fontFamily: "Roboto Mono" }}>
                      {lottoData.meaning}
                    </p>
                    <br />
                    <h3 style={{ fontFamily: "Rubik" }}>Linked Event</h3>
                    <p style={{ fontFamily: "Roboto Mono" }}>
                      {lottoData.event}
                    </p>
                    <br />
                    <button
                      className="AddFav"
                      style={{
                        position: "fixed",
                        bottom: "10px",
                      }}
                    >
                      Add to favorite
                    </button>
                  </>
                )}
              </Box>
            </Modal>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Lotto;