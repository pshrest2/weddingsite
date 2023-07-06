import React, { useState } from "react";

import envelopeImage from "../envelope.png";
import cardImage from "../invitation-card.png";

const Envelope = () => {
  const [isEnvelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <div className="app">
      <div className="d-flex align-items-center mt-5">
        {isEnvelopeOpen ? (
          <img
            className="mx-auto"
            src={cardImage}
            alt="Invitation Card"
            width={500}
            onClick={() => setEnvelopeOpen(false)}
          />
        ) : (
          <img
            className="mx-auto"
            src={envelopeImage}
            alt="Envelope"
            width={500}
            onClick={() => setEnvelopeOpen(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Envelope;
