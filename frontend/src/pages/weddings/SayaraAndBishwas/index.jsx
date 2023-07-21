import { useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSpring, animated } from "@react-spring/web";

import PasscodeModal from "./PasscodeModal";

import { getGuestByPasscode } from "../../../api/apiCalls";
import usePasscode from "../../../hooks/usePasscode";

// Need a better way to do this
const WEDDING_ID = 1;

const guestInitialValue = {
  name: "",
  nimtoType: "",
};

const AnimatedComponent = () => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const handleClick = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    });
  };
  return (
    <animated.div
      onClick={handleClick}
      style={{
        width: 80,
        height: 80,
        background: "#ff6d6d",
        borderRadius: 8,
        ...springs,
      }}
    />
  );
};

const SayaraAndBishwas = () => {
  const { passcode, setPasscode } = usePasscode();
  const [guest, setGuest] = useState(guestInitialValue);

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
    <Container>
      <div>
        Hello {guest.name}, you are intivited to this wedding as{" "}
        {guest.nimtoType}
        <AnimatedComponent />
      </div>
    </Container>
  );
};

export default SayaraAndBishwas;
