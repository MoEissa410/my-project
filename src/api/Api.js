import axios from "axios";

export async function walMart() {
  const res = await axios.get("https://fakestoreapiserver.reactbd.com/walmart");
  return res.data;
}
