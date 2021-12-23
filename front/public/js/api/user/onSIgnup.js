export const onSignup = async ({ email, password, nickname, birth, gender, tags, github }) => {
  try {
    const result = await fetch("http://localhost:9999/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, nickname, birth, gender, tags, github }),
    });
    const res = result.json();
    return res;
  } catch (e) {
    return { status: false, message: "서버 에러입니다." };
  }
};
