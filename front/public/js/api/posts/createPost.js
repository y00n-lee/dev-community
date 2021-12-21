export const createPost = async ({ title, content, tagList }) => {
	try {
		const result = await fetch("http://localhost:9999/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ title, content, tagList }),
		});

		const res = result.json();

		return res;
	} catch (e) {
		return { status: false, message: "서버 에러입니다." };
	}
};