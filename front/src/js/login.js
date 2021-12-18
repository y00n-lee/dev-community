const $form = document.querySelector("form");
const $id = $form.querySelector(".id");
const $password = $form.querySelector(".password");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  if ($id.value === "") {
    alert("아이디를 입력해주세요!");
  } else if ($password.value === "") {
    alert("비밀번호를 입력해주세요.");
  } else if ($password.value.length < 8) {
    alert("비밀번호는 8글자 이상입니다!");
  }
});
