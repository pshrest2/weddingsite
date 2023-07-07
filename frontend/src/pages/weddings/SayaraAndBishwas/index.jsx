import { useCallback, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

import PasscodeModal from "./PasscodeModal";

import { getGuestByPasscode } from "../../../api/apiCalls";

// Need a better way to do this
const WEDDING_ID = 1;

const guestInitialValue = {
  name: "",
  nimtoType: "",
};

const SayaraAndBishwas = () => {
  const [requirePasscode, setRequirePasscode] = useState(true);
  const [guest, setGuest] = useState(guestInitialValue);

  const showGuest = useMemo(
    () => guest.name && guest.nimtoType,
    [guest.name, guest.nimtoType]
  );

  const loadGuest = useCallback(async (passcode) => {
    try {
      const { name, nimtoType } = await getGuestByPasscode(
        WEDDING_ID,
        passcode
      );
      setGuest({ name, nimtoType });
      setRequirePasscode(false);
    } catch (error) {
      toast.error(error);
      setGuest(guestInitialValue);
      setRequirePasscode(true);
    }
  }, []);

  if (requirePasscode)
    return <PasscodeModal show={requirePasscode} onSubmit={loadGuest} />;

  return (
    <Container>
      {showGuest && (
        <h4>
          Hello {guest.name}, you are intivited to this wedding as{" "}
          {guest.nimtoType}
        </h4>
      )}
    </Container>
  );
};

export default SayaraAndBishwas;
