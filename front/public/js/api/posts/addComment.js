export const addComment = async ({ postId, content }) => {
	try {
		const result = await fetch(`http://localhost:9999/posts/${postId}/comment`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ content }),
		});

		const res = result.json();

		return res;
	} catch (e) {
		return { status: false, message: "서버 에러입니다." };
	}
};