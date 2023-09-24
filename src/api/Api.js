import axios from "axios";

export async function walMart() {
  const res = await axios.get("https://fakestoreapiserver.reactbd.com/walmart");
  console.log(res.data);
  return res.data;
}
