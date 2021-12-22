export const changePassword = async ({ currentPassword, password }) => {
  try {
    const result = await fetch("http://localhost:9999/user/password/reset", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ currentPassword, password }),
    });

    const res = result.json();

    return res;
  } catch (e) {
    return { status: false, message: "서버 에러입니다." };
  }
};
