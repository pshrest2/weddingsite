import { READABLE_NIMTO_TYPE } from "../../../helpers/enums";

const NimtoType = ({ value: { nimtoType } }) => {
  return <div>{READABLE_NIMTO_TYPE[nimtoType]}</div>;
};

export default NimtoType;
