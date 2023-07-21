import { useCallback, useEffect, useState } from "react";

const usePasscode = () => {
  const [passcode, updatePasscode] = useState(null);
  const getPasscode = useCallback(() => {
    const currentPasscode = localStorage.getItem("weddingsite__passcode");
    updatePasscode(currentPasscode);
  }, []);

  const setPasscode = useCallback((code) => {
    updatePasscode(code);
    localStorage.setItem("weddingsite__passcode", code);
  }, []);

  useEffect(() => {
    getPasscode();
  }, [getPasscode]);

  return { passcode, setPasscode };
};

export default usePasscode;
