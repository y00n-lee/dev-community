import { nanoid } from "nanoid";

const shortId = {
  type: String,
  default: () => nanoid(),
  required: true,
  index: true,
};

export default shortId;
