export const resetPaaword = async ({ email, password, nickname, birth, gender, tags }) => {
  try {
    const result = await fetch("http://localhost:9999/user/password/reset", {
      method: "POST",
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
