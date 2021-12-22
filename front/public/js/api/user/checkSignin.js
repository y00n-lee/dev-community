export const checkSignin = async () => {
  try {
    const result = await fetch(`http://localhost:9999/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/user",
      },
      credentials: "include",
    });

    const res = await result.json();

    // {status: true, data: {id, nickname}}
    return res;
  } catch (e) {
    return { status: false, message: e.message };
  }
};
