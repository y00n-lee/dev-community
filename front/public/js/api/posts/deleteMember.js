export const deleteMember = async (postId) => {
  try {
    const result = await fetch(`${url}/posts/${postId}/member`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const res = result.json();

    return res;
  } catch (e) {
    return { status: false, message: "서버 에러입니다." };
  }
};
