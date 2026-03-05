import { useEffect, useState } from "react";
import { getAuctions } from "../api";

function Auctions() {

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    getAuctions()
      .then(res => {
        setAuctions(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (

    <div style={{
      background:"#1c1c1c",
      minHeight:"100vh",
      padding:"40px",
      color:"white"
    }}>

      <h1 style={{marginBottom:"30px"}}>Najtraženije aukcije</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(250px,1fr))",
        gap:"20px"
      }}>

        {auctions.map(a => (

          <div key={a.id} style={{
            background:"#2a2a2a",
            borderRadius:"10px",
            overflow:"hidden",
            boxShadow:"0 4px 10px rgba(0,0,0,0.4)"
          }}>

            <img
              src="https://picsum.photos/400/250"
              alt="auction"
              style={{
                width:"100%",
                height:"180px",
                objectFit:"cover"
              }}
            />

            <div style={{padding:"15px"}}>

              <h3>{a.title}</h3>

              <p style={{opacity:"0.7"}}>
                {a.description}
              </p>

              <b style={{color:"#00d26a"}}>
                Cena: {a.starting_price} €
              </b>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Auctions;