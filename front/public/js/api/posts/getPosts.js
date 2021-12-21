export const getPosts = async ({ page, perPage }) => {
	try {
		const result = await fetch(`http://localhost:9999/posts?page=${page}&perPage=${perPage}`, {
			method: "GET",
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