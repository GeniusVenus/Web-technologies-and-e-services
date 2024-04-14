import data from "../json/info.json" assert { type: "json" };
import sideBarContent from "../json/sideBarContent.json" assert { type: "json" };

const main = document.getElementById("main");
if (window.sessionStorage.length <= 10) {
  data["THÔNG TIN SINH VIÊN"].forEach((item) => {
    for (const [key, val] of Object.entries(item)) {
      window.sessionStorage.setItem(key, val);
    }
  });
}
var source_image = "resources/images/avatar.png";
const source_image_copy = source_image;
const Tag = (tagName, className) => {
  const tag = document.createElement(tagName);
  if (className) tag.classList.add(className);
  return tag;
};
/* TTSV */
var TTSV = {
  MSSV: "20215244",
  "Họ và tên": "Nguyễn Đức Thắng",
  "Năm vào trường": 2021,
  "Bậc đào tạo": "KSCLC-TN-TT-VN-ICT",
  "Chương trình": "Công nghệ thông tin Global ICT 2021",
  "Khoa/Viện quản lý": "Trường Công nghệ thông tin và Truyền Thông",
  "Tình trạng học tập": "Học",
  "Giới tính": "Nam",
  Lớp: "ICT 01-K66",
  "Khóa học": 66,
  Email: "thang.nd215244@sis.hust.edu.vn",
};
const TTSVCopy = TTSV;
/* Save function */
const saveInfo = () => {
  console.log("***SaveInfo***");
  const form = document.getElementById("form-info");
  const inputs = form.querySelectorAll("input");
  const select = form.querySelector("select");
  const infos = form.getElementsByClassName("info-item");
  for (var i = 2; i <= 11; i++) {
    TTSV = { ...TTSV, [inputs[i].name]: inputs[i].value };
  }
  TTSV = { ...TTSV, [select.name]: select.value };
  console.log(TTSV);
  const mssv = form.getElementsByClassName("mssv");
  const upload_image = document.getElementById("upload-image");
  if (upload_image.files[0])
    source_image = URL.createObjectURL(upload_image.files[0]);
  document.getElementById("avatar").src = source_image;
  mssv[0].innerHTML =
    "<em>MSSV:</em>" + "<strong>" + TTSV[inputs[2].name] + "</strong>";
  for (var i = 3; i <= 12; i++) {
    if (i == 9) {
      infos[i - 3].innerHTML =
        `<em>${select.name}</em>` +
        "&nbsp&nbsp&nbsp&nbsp:&nbsp" +
        `<strong>${TTSV[select.name]}</strong>`;
      infos[i - 3].appendChild(select);
      continue;
    }
    infos[i - 3].innerHTML =
      `<em>${inputs[i - (i > 9)].name}</em>` +
      "&nbsp&nbsp&nbsp&nbsp:&nbsp" +
      `<strong>${TTSV[inputs[i - (i > 9)].name]}</strong>`;
    infos[i - 3].appendChild(inputs[i - (i > 9)]);
  }
};
/* Cancel save function */
const cancelSaveInfo = () => {
  console.log("***Cancel save info***");
  const form = document.getElementById("form-info");
  const select = form.querySelector("select");
  const inputs = form.querySelectorAll("input");
  const upload_image = document.getElementById("upload-image");
  console.log(TTSV);
  document.getElementById("avatar").src = source_image;
  upload_image.value = "";
  for (var i = 2; i <= 11; i++) {
    inputs[i].value = TTSV[inputs[i].name];
  }
  select.value = TTSV[select.name];
};

/* Reset function */
const resetInfo = () => {
  console.log("***Reset info***");
  const form = document.getElementById("form-info");
  const inputs = form.querySelectorAll("input");
  const select = form.querySelector("select");
  const upload_image = document.getElementById("upload-image");
  const infos = form.getElementsByClassName("info-item");
  TTSV = TTSVCopy;
  source_image = source_image_copy;
  console.log(TTSV);
  const mssv = form.getElementsByClassName("mssv");
  document.getElementById("avatar").src = source_image;
  mssv[0].innerHTML =
    "<em>MSSV:</em>" + "<strong>" + TTSV[inputs[2].name] + "</strong>";
  for (var i = 3; i <= 12; i++) {
    if (i == 9) {
      infos[i - 3].innerHTML =
        `<em>${select.name}</em>` +
        "&nbsp&nbsp&nbsp&nbsp:&nbsp" +
        `<strong>${TTSV[select.name]}</strong>`;
      infos[i - 3].appendChild(select);
      continue;
    }
    infos[i - 3].innerHTML =
      `<em>${inputs[i - (i > 9)].name}</em>` +
      "&nbsp&nbsp&nbsp&nbsp:&nbsp" +
      `<strong>${TTSV[inputs[i - (i > 9)].name]}</strong>`;
    infos[i - 3].appendChild(inputs[i - (i > 9)]);
  }
  for (var i = 2; i <= 11; i++) {
    inputs[i].value = TTSV[inputs[i].name];
  }
  upload_image.value = "";
  select.value = TTSV[select.name];
};
/* Trang chủ redirection */
const trang_chu = Tag("a", "trang-chu");
trang_chu.href = "#";
trang_chu.textContent = "Trang chủ";

/* Info container */
const container = Tag("div", "main-container");

/* Side bar section*/
const side_bar = Tag("div", "side-bar");
for (const [name, value] of Object.entries(sideBarContent)) {
  const menu = Tag("div", "menu");
  const menu_title = Tag("div", "menu-title");
  const title = Tag("span", "");
  title.textContent = name;
  if (name === "NGUYỄN ĐỨC THẮNG") {
    const avatar = Tag("img", "avatar");
    avatar.src = "resources/images/avatar.png";
    menu_title.appendChild(avatar);
  }
  menu_title.appendChild(title);
  menu.appendChild(menu_title);
  for (const { content, text, link } of value) {
    const menu_item = Tag("div", "");
    if (text) {
      menu_item.classList.add("menu-item-dropdown");
      const icon = Tag("i", "glyphicon");
      icon.classList.add("glyphicon-chevron-right");
      const dropdown = Tag("div", "dropdown");
      const dropdown_title = Tag("div", "dropdown-title");
      dropdown_title.innerText = text;
      const dropdown_content = Tag("div", "dropdown-content");
      content.forEach(({ text, link }) => {
        const dropdown_item = Tag("a", "dropdown-item");
        dropdown_item.innerText = text;
        dropdown_item.href = link;
        dropdown_content.appendChild(dropdown_item);
      });
      dropdown.appendChild(dropdown_title);
      dropdown.appendChild(dropdown_content);
      menu_item.appendChild(icon);
      menu_item.appendChild(dropdown);
    } else {
      menu_item.classList.add("menu-item");
      const item = Tag("a", "item");
      item.innerText = content;
      item.href = link;
      menu_item.appendChild(item);
      if (content === "Thư báo") {
        const num_letter = Tag("div", "num-letter");
        num_letter.innerText = 0;
        menu_item.appendChild(num_letter);
      }
    }
    menu.appendChild(menu_item);
  }
  side_bar.appendChild(menu);
}
/* Information section */
const info_section = Tag("div", "info-section");
const info_section_header = Tag("div", "info-section-header");
info_section_header.innerText = "THÔNG TIN CÁ NHÂN";
const hr = Tag("hr");
info_section_header.appendChild(hr);
const info_section_body = Tag("div", "info-section-body");
for (const [title, info] of Object.entries(data)) {
  const info_container = Tag(
    title === "THÔNG TIN SINH VIÊN" ? "form" : "div",
    "info-container"
  );
  const info_container_header = Tag("div", "info-container-header");
  info_container_header.innerText = title;
  /* Edit , Ok , Cancel , Reset button  */
  if (title === "THÔNG TIN SINH VIÊN") {
    info_container.id = "form-info";
    const tools_btn = Tag("div", "tools");
    const ok_btn = Tag("input", "ok-btn");
    ok_btn.type = "submit";
    ok_btn.value = "Ok";
    ok_btn.addEventListener("click", (e) => {
      e.preventDefault();
      saveInfo();
      info_container.classList.toggle("editable");
    });
    const cancel_btn = Tag("button", "cancel-btn");
    cancel_btn.innerText = "Cancel";
    cancel_btn.addEventListener("click", (e) => {
      e.preventDefault();
      cancelSaveInfo();
      info_container.classList.toggle("editable");
    });
    const reset_btn = Tag("button", "reset-btn");
    reset_btn.innerText = "Reset";
    reset_btn.addEventListener("click", (e) => {
      e.preventDefault();
      resetInfo();
      info_container.classList.toggle("editable");
    });
    tools_btn.appendChild(ok_btn);
    tools_btn.appendChild(cancel_btn);
    tools_btn.appendChild(reset_btn);
    info_container_header.appendChild(tools_btn);
    const edit_btn = Tag("img", "edit-btn");
    edit_btn.src = "resources/icons/edit_icon.png";
    edit_btn.addEventListener("click", () => {
      info_container.classList.toggle("editable");
    });
    info_container_header.appendChild(edit_btn);
  }
  const info_container_body = Tag("div", "info-container-body");
  info.forEach((value) => {
    const list_info = Tag("div", "list-info");
    for (const [key, val] of Object.entries(value)) {
      if (title === "THÔNG TIN SINH VIÊN" && key === "MSSV") {
        const avatar = Tag("div", "avatar");
        const image = Tag("img");
        image.src = source_image;
        image.id = "avatar";
        const upload_image_btn = Tag("button");
        upload_image_btn.innerText = "Upload image";
        upload_image_btn.className = "upload-image-btn";
        const upload_image = Tag("input");
        upload_image.id = "upload-image";
        upload_image.type = "file";
        upload_image.accept = "image/jpeg, image/png, image/jpg";
        upload_image.innerText = "Upload image";
        const MSSV = Tag("div", "mssv");
        MSSV.innerHTML =
          "<em>MSSV:</em>" +
          `<strong> ${TTSV[key] ? TTSV[key] : val} </strong>`;
        upload_image_btn.addEventListener("click", (e) => {
          e.preventDefault();
          document.getElementById("upload-image").click();
        });
        upload_image.onchange = () => {
          document.getElementById("avatar").src = URL.createObjectURL(
            upload_image.files[0]
          );
        };
        avatar.appendChild(image);
        avatar.appendChild(upload_image_btn);
        avatar.appendChild(upload_image);
        avatar.appendChild(MSSV);
        const input = Tag("input");
        input.type = Number.isInteger(val) ? "number" : "text";
        input.value = TTSV[key] ? TTSV[key] : val;
        input.name = key;
        avatar.appendChild(input);
        info_container_body.appendChild(avatar);
        continue;
      }
      const info_item = Tag("div", "info-item");
      info_item.innerHTML =
        `<em>${key}</em>` +
        "&nbsp&nbsp&nbsp&nbsp:&nbsp" +
        `<strong>${title === "THÔNG TIN SINH VIÊN" ? TTSV[key] : val}</strong>`;
      if (title === "THÔNG TIN SINH VIÊN") {
        const input = Tag(key === "Giới tính" ? "select" : "input");
        input.name = key;
        if (key !== "Giới tính") {
          input.type = Number.isInteger(val) ? "number" : "text";
          input.value = TTSV[key] ? TTSV[key] : val;
        } else {
          const list = ["Nam", "Nữ"];
          list.forEach((val) => {
            const option = Tag("option");
            option.value = val;
            option.innerText = val;
            input.appendChild(option);
          });
          input.value = TTSV[key];
        }
        info_item.appendChild(input);
      }
      list_info.appendChild(info_item);
    }
    info_container_body.appendChild(list_info);
  });
  info_container.appendChild(info_container_header);
  info_container.appendChild(info_container_body);
  info_section_body.appendChild(info_container);
}

/* Responsive bar */
const control_side_bar = main.getElementsByClassName("control-side-bar")[0];
const control_nav_bar = main.getElementsByClassName("control-nav-bar")[0];
const nav = main.getElementsByClassName("nav-bar")[0];
control_side_bar.addEventListener("click", () => {
  const menu_icon = control_side_bar.getElementsByTagName("i")[0];
  console.log(control_side_bar);
  if (menu_icon.className === "glyphicon glyphicon-menu-hamburger")
    menu_icon.className = "glyphicon glyphicon-remove";
  else menu_icon.className = "glyphicon glyphicon-menu-hamburger";
  side_bar.classList.toggle("active");
});
control_nav_bar.addEventListener("click", () => {
  const menu_icon = control_nav_bar.getElementsByTagName("i")[0];
  if (menu_icon.className === "glyphicon glyphicon-menu-hamburger")
    menu_icon.className = "glyphicon glyphicon-remove";
  else menu_icon.className = "glyphicon glyphicon-menu-hamburger";
  nav.classList.toggle("active");
});

/* Note */
const note = Tag("div", "ghi-chu");
note.innerHTML =
  "<strong>Ghi chú</strong>:Nếu sinh viên thấy thông tin của mình chưa chính xác, xin vui lòng liên hệ phòng Đào tạo để cập nhật lại.";
info_section_body.appendChild(note);

info_section.appendChild(info_section_header);
info_section.appendChild(info_section_body);
container.appendChild(side_bar);
container.appendChild(info_section);

/* Scroll Top button */
const scrolltop_btn = document.getElementById("scrolltop-btn");
window.addEventListener("scroll", () => {
  var y = window.scrollY;
  if (y <= 200) scrolltop_btn.style.display = "none";
  else scrolltop_btn.style.display = "block";
});
scrolltop_btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

main.appendChild(trang_chu);
main.appendChild(container);
