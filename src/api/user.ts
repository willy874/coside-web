import axios from "axios";
import useLoginStore from "@/stores/loginStore";

export const userGetById = async (id: string) => {
  try {
    const token = useLoginStore.getState().token; // 取得 token

    const response = await axios.get(`/api/user/${id}`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // 避免靜默錯誤，讓調用方可以捕獲
  }
};

export const userGetSelf = async (token: string) => {
  try {
    const response = await axios.get(`/api/user`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });

    return response.data;
  }
  catch (error) {
    console.error("API Error:", error);
    throw error; // 避免靜默錯誤，讓調用方可以捕獲
  }
}

export const userGetCreatorInfo = async (id: string) => {
  try {
    const response = await axios.get(`/api/user/creator/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // 避免靜默錯誤，讓調用方可以捕獲
  }
};
