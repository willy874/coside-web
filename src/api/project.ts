import axios from "axios";
import useLoginStore from "@/stores/loginStore";

export const projectGetByFilter = async (page: number, size: number = 12) => {
  try {
    const token = useLoginStore.getState().token; // 取得 token

    const response = await axios.get(`/api/project`, {
      params: { page, size },
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // 避免靜默錯誤，讓調用方可以捕獲
  }
};

export const projectGetById = async (id: string) => {
  try {
    const token = useLoginStore.getState().token; // 取得 token

    const response = await axios.get(`/api/project/${id}`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // 避免靜默錯誤，讓調用方可以捕獲
  }
};
