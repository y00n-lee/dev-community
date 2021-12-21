export const deleteComment = async ({ postId, commentId }) => {
	try {
		const result = await fetch(`http://localhost:9999/posts/${postId}/comment`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ commentId }),
		});

		const res = result.json();

		return res;
	} catch (e) {
		return { status: false, message: "서버 에러입니다." };
	}
};