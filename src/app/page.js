"use client"

import Head from "next/head";
import {useRouter} from "next/navigation";
import { useState } from "react";
import { doLogin } from "@/services/Web3Service"; 

export default function Home() {

  const { push } = useRouter();

  const [message, setMessage] = useState();

  function btnLoginClick() {
   // push("/bet");
   setMessage("Conectando na carteira...  aguarde...");

   doLogin()
    .then(account => push("/bet"))//caso de sucesso
    .catch(err => {
      console.error(err); //erro no login
      setMessage(err.message);
    })


  }


  return (
    <>
      <Head>

        <title>BetCandidate | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <img src="https://i0.wp.com/apublica.org/wp-content/uploads/2024/07/Capa_No-combate-Kamala-x-Trump-contraste-na-agenda-climatica-fica-mais-dramatico.webp?fit=774%2C516&ssl=1" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
            <p className="lead">Apostas on-chain nas eleições americanas.</p>
            <p className="lead">Autentique-se com sua carteira e deixe a sua aposta para a próxima disputa.</p>

            <div className="d-flex justify-content-start">
              <button type="button" className="btn btn-primary btn-lg px-4" onClick={btnLoginClick}>
                <img src="metamask.svg" width={64} className="me-3" />
                Conectar MetaMask
              </button>
            </div>
            <p className="message">{message}</p>
          </div>
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
//parou em 32:20 contunuar amanahã
