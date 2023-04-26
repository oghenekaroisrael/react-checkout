import { AxiosError } from "axios";
import axios from "../utils/axios";

export async function getProducts() {
  try {
    const res = await axios.get('/api/products');
    console.log(res);
    const payload: any = res.data;
    return { payload };
  } catch (error: any) {
    return { error: error as AxiosError };
  }
}