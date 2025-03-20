import { redirect } from "next/navigation";


export default function ServerHandleToken({searchParams} : {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // const token = searchParams.token;
  console.log('這是server Side handle token', searchParams);

  // 可以在這裡進行伺服器端處理，例如交換 token、設置 Cookie 等
  // console.log("Server side token:", token);

  // 若需要移除 URL 參數，可以透過 redirect 導向沒有 token 的頁面
  // if (token) {
    // 例如：導向首頁或其他頁面
    // redirect("/");
  // }

  

  return (
    <div>
      <h1>Server-side handle token</h1>
      <p>這是伺服器端處理 token 的範例。</p>  
    </div>
  );
}
