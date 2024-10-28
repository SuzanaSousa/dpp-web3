"use client";

import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter} from "next/navigation";
import { getDispute, claimPrize, placeBet } from "@/services/Web3Service";
import Web3 from "web3";


export default function Bet() {
  
  const {push} = useRouter();

  const [message, setMessage] = useState();
  const [dispute, setDispute] = useState({
    candidate1: "Loading...",
    candidate2: "Loading...",
    image1:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHWFM1IG7wiMV5ef2xI-Yyxq2KCeWsjovfn5G42EwcKG15qAKzkCA2GH_V8xI3MrM0ADI&usqp=CAU",
    image2:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHWFM1IG7wiMV5ef2xI-Yyxq2KCeWsjovfn5G42EwcKG15qAKzkCA2GH_V8xI3MrM0ADI&usqp=CAU",
    total1: 0,
    total2: 0,
    winner: 0
  });
 
  useEffect(() => {
        if(!localStorage.getItem("wallet")) return push("/"); 
        setMessage("Obtendo dados da disputa...aguarde...");
        getDispute()
           .then(dispute => {
              setDispute(dispute);
              setMessage("");
            })
            .catch(err => {
              cosole.error(err);
              setMessage(err.message);
            })
    },[]);

    function processBet(candidate) {
      setMessage("Conectando na carteira...aguarde...");
      const amount = prompt("Quantia em POL para apostar", "1");
      placeBet(candidate, amount)
      .then(() => {
        alert("Aposta recebida com sucesso. pode demorar 1 minuto para que apareça no sistema");
        setMessage("");
      })
      .catch(err =>{
        console.error(err);
        setMessage(err.message);
      })
    }
    function btnClaimClick(){
      setMessage("Conectando na carteira...aguarde...");
      claimPrize()
      .then(() => {
        alert("Prêmio com sucesso. pode demorar 1 minuto para que apareça na sua carteira");
        setMessage("");
      })
      .catch(err =>{
        console.error(err);
        setMessage(err.message);
      })

    }

return (
    <>
      <Head>

        <title>BetCandidate | Bet</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row    align-items-center">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
          <p className="lead">Apostas on-chain nas eleições americanas.</p>

          {
            dispute.winner == 0
              ?<p className="lead">Você tem até o dia da eleição para deixar sua aposta em um dos candidatos abaixo.</p>
              :<p className="lead">Disputa encerrada. Veja o vencedor abaixo e solicite seu prêmio. </p>
          }
          
        </div>
        <div className="row flex-lg-rw-reverse align-items-center g-l py-5">
        {
          dispute.winner == 0 || dispute.winner == 1
            ? <div className="col" >
              <h3 className="my-2 d-block mx-auto"  style={{width: 250}}>
              {dispute.candidate1} 
              </h3>
            <img src={dispute.image1} className="my-2 d-block mx-auto" style={{width: 250}}></img>
            {
              dispute.winner == 1
              ?<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{widows:250}} onClick={btnClaimClick}> Retirar meu prêmio </button>
              :<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{widows:250}} onClick={() => processBet(1)}> Aposto nesse candidato </button>
            }
            <span className="badge text-bg-secondary d-block mx-auto" style={{width:250}}>{Web3.utils.fromWei(dispute.total1, "ether")} POL Apostados </span>
          </div>
          :<> </>
        } 
        {
          dispute.winner == 0 || dispute.winner == 2
          ?<div className="col" >
            <h3 className="my-2 d-block mx-auto" style={{width: 250}}>
              {dispute.candidate2}
            </h3>
            <img src={dispute.image2}className="my-2 d-block mx-auto" style={{width: 250}}></img>
            {
              dispute.winner == 2
              ?<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{widows:250}} onClick={btnClaimClick}> Retirar meu prêmio </button>
              :<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{widows:250}} onClick={() => processBet(2)}> Aposto nesse candidato </button>
            }
            <span className="badge text-bg-secondary d-block mx-auto" style={{width:250}}>{Web3.utils.fromWei(dispute.total2, "ether")} POL Apostados</span>  
          </div>
          :<></>
        }
        </div>
        <div className="row align-items-center">
           <p className="message">{message}</p>
        </div>

        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-4 mb-0 text-body-secondary">
            &copy; 2024 BetCandidate, Inc
          </p>
          <ul className="nav col-4 justify-content-end">
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="/about" className="nav-link px-2 text-body-secondary">About</a></li>
          </ul>
        </footer>
      </div>
    </>
  );
}