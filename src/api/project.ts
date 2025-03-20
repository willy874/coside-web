import axios from "axios";
import useLoginStore from "@/stores/loginStore";

function convertToQueryParams(params: object | null) {
  if (!params) return {};

  // 建立一個新的物件用於存儲轉換後的參數
  const queryParams: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    // 對於陣列和非陣列的處理方式相同
    // Axios 會自動處理陣列並生成多個相同名稱的參數
    queryParams[key] = value;
  });

  return queryParams;
}

export const projectGetByFilter = async (
  page: number,
  size: number = 12,
  filters: object | null = null
) => {
  try {
    const token = useLoginStore.getState().token;

    const params: Record<string, any> = { page, size };

    // 如果 filters 不為 null，則合併查詢參數
    if (filters) {
      Object.assign(params, convertToQueryParams(filters));
    }

    // 設置 paramsSerializer 來自定義參數序列化方式
    const response = await axios.get(`/api/project`, {
      params,
      headers: { Authorization: token ? `Bearer ${token}` : "" },
      paramsSerializer: {
        indexes: null, // 這會使 Axios 生成 roles=value1&roles=value2 而不是 roles[]=value1&roles[]=value2
      }
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
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
