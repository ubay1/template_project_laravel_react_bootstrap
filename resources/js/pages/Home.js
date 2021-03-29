import Header from "../components/Header";
import React from 'react';
import "../assets/global.css";

function Home() {
  return(
    <>
    <Header />
    <div className="container-fluid mt-4 vh-100">
      ini home {process.env.MIX_DEV_API_URL}
      {
        console.log(process.env.MIX_DEV_API_URL)
      }
    </div>
    </>
  )
}

export default Home;