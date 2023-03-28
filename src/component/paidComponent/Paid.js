import React, { useState } from 'react';

function Paid() {
  const [response, setResponse] = useState('');

  const product = {
    label: "Achat d'un Iphone S",
    amount: 15,
    details: "Iphone S, 32 GB, Gris...",
  };
  const customer = {
    uuid: "d34f747e-8876-428c-9466-becf59177bde",
    name: "fraise",
    phone: "064021704",
  };
  const url = "https://ekolopay.com/api/v1/gateway/purchase-token?api_client=easystudy";

  const makePurchaseRequest = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: JSON.stringify(customer),
        product: JSON.stringify(product),
        amount: 15,
        secret_key: "a96d3a19-6e5c-46a6-9af2-fe99815b92a5"
      })
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.response) {
          setResponse(data.response);
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <button onClick={makePurchaseRequest}>Effectuer l'achat</button>
      {response && <p>Réponse de la requête: {response}</p>}
    </div>
  );
}

export default Paid;
