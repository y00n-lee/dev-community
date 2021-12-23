import { url } from "../../config/prodApi.js";
export const createPost = async ({ title, content, tagList, time }) => {
  try {
    const result = await fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, content, tagList, time }),
    });

    const res = result.json();

    return res;
  } catch (e) {
    return { status: false, message: "서버 에러입니다." };
  }
};
