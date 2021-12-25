import { url } from "../../config/prodApi.js";
export const editUserInfo = async (id, data, queryname) => {
  try {
    const result = await fetch(`${url}/user/${id}/edit?name=${queryname}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
      credentials: "include",
    });

    const res = result.json();

    return res;
  } catch (e) {
    return { status: false, message: "서버 에러입니다." };
  }
};
