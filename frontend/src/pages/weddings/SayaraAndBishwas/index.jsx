import { useCallback, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import PasscodeModal from "./PasscodeModal";

import { getGuestByPasscode } from "../../../api/apiCalls";

import landingPage from "../../../images/landing-page.png";
import usePasscode from "../../../hooks/usePasscode";

// Need a better way to do this
const WEDDING_ID = 1;

const guestInitialValue = {
  name: "",
  nimtoType: "",
};

const SayaraAndBishwas = () => {
  const [guest, setGuest] = useState(guestInitialValue);
  const { passcode, setPasscode } = usePasscode();

  const loadGuest = useCallback(
    async (code) => {
      setPasscode(code);
      try {
        const { name, nimtoType } = await getGuestByPasscode(WEDDING_ID, code);
        setGuest({ name, nimtoType });
      } catch (error) {
        toast.error(error);
        setGuest(guestInitialValue);
        setPasscode(null);
      }
    },
    [setPasscode]
  );

  if (!passcode) return <PasscodeModal show={!passcode} onSubmit={loadGuest} />;

  return (
    <div>
      <div>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Image src={landingPage} fluid />
          </Col>
          <h4>
            Hello {guest.name}, you are intivited to this wedding as{" "}
            {guest.nimtoType}
          </h4>
        </Row>
      </div>
    </div>
  );
};

export default SayaraAndBishwas;
