import dummy from "./data.js";

export const onSignup = async (data) => ({
  status: true,
});

export const onSignIn = async (data) => ({
  status: true,
  data: {
    user: {
      _id: "61bff86a27daf3450116db21",
      email: "sukho1007@naver.com",
      nickname: "지석호",
      birth: "2021-10-06T15:00:00.000Z",
      gender: "male",
      tags: [],
      posts: [],
      emailVerified: false,
      passwordReset: false,
      createdAt: "2021-12-20T03:28:42.351Z",
      updatedAt: "2021-12-20T04:46:44.333Z",
      __v: 0,
    },
  },
});

// export const onSignIn = async (data) => ({
//   status: false,
//   message: "비밀번호가 틀렸습니다",
// });

export const getUserInfo = async (id) => ({
  status: true,
  data: {
    user: {
      _id: "61bff86a27daf3450116db21",
      email: "sukho1007@naver.com",
      nickname: "지석호",
      birth: "2021-10-06T15:00:00.000Z",
      gender: "male",
      tags: [],
      posts: [],
      emailVerified: false,
      keyForVerify: "e0d393a393ffdabc6767fFQtFD/+AiiB6crhqDPm",
      passwordReset: false,
      createdAt: "2021-12-20T03:28:42.351Z",
      updatedAt: "2021-12-20T04:46:44.333Z",
      __v: 0,
    },
  },
});

export const checkSignin = async () => ({
  status: true,
  data: {
    id: 1,
    nickname: "지석호",
  },
});

export const editUserInfo = async (id, data, queryname) => ({
  status: true,
  message: "변경되었습니다.",
});

export const resetPassword = async (email) => ({
  status: false,
  message: "임시 비밀번호가 메일로 전송됐습니다.",
});

export const inSignout = async () => ({
  status: true,
});

/* post */
export const getPosts = async ({ postId, content }) => dummy.posts;

export const getPost = async (postId) => dummy.post;

export const createPost = async ({ title, content, tagList }) => ({
  status: true,
  message: "등록되었습니다.",
});

export const editPost = async ({ postId, title, content, tagList }) => ({
  status: true,
  message: "수정되었습니다.",
});

export const deletePost = async (postId) => ({
  status: true,
  message: "삭제되었습니다.",
});

/* member */
export const addMember = async (postId) => ({
  status: true,
  message: "참여되었습니다.",
});

export const deleteMember = async (postId) => ({
  status: true,
  message: "취소되었습니다.",
});

/* comment */
export const addComment = async ({ postId, content }) => ({
  status: true,
  message: "처리되었습니다.",
});

export const deleteComment = async ({ postId, commentId }) => ({
  status: true,
  message: "삭제되었습니다.",
});
