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
const Tag = (tagName, className) => {
  const tag = document.createElement(tagName);
  if (className) tag.classList.add(className);
  return tag;
};
/* Save function */
const saveInfo = () => {
  console.log("***SaveInfo***");
  const form = document.getElementById("form-info");
  const inputs = form.querySelectorAll("input");
  const infos = form.getElementsByClassName("info-item");
  for (var i = 1; i <= 10; i++) {
    window.sessionStorage.setItem(inputs[i].name, inputs[i].value);
  }
  const mssv = form.getElementsByClassName("mssv");
  mssv[0].innerHTML = "<em>MSSV:</em>" + "<p>" + inputs[1].value + "</p>";
  for (var i = 2; i <= 10; i++) {
    infos[i - 2].innerHTML =
      `<em>${inputs[i].name}</em>` +
      "&nbsp&nbsp&nbsp&nbsp:&nbsp" +
      `<p>${inputs[i].value} </p>`;
    infos[i - 2].appendChild(inputs[i]);
  }
};
const cancelSaveInfo = () => {
  console.log("***Cancel save info***");
  const form = document.getElementById("form-info");
  const inputs = form.querySelectorAll("input");
  for (var i = 1; i <= 10; i++) {
    inputs[i].value = window.sessionStorage.getItem(inputs[i].name);
  }
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
  /* Edit , Ok , Cancel button  */
  if (title === "THÔNG TIN SINH VIÊN") {
    info_container.id = "form-info";
    const ok_btn = Tag("input", "ok-btn");
    ok_btn.type = "submit";
    ok_btn.value = "Ok";
    ok_btn.addEventListener("click", (e) => {
      e.preventDefault();
      saveInfo();
      window.location.href = "/";
    });
    const cancel_btn = Tag("button", "cancel-btn");
    cancel_btn.innerText = "Cancel";
    cancel_btn.addEventListener("click", (e) => {
      e.preventDefault();
      cancelSaveInfo();
      window.location.href = "/";
    });
    info_container_header.appendChild(ok_btn);
    info_container_header.appendChild(cancel_btn);
    const edit_btn = Tag("img", "edit-btn");
    edit_btn.src = "resources/icons/edit_icon.png";
    edit_btn.addEventListener("click", () => {
      // info_container.classList.toggle("editable");
      window.location.href = "/edit.html";
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
        image.src = "resources/images/avatar.png";
        const MSSV = Tag("div", "mssv");
        MSSV.innerHTML =
          "<em>MSSV:</em>" +
          `<strong> ${
            window.sessionStorage.getItem(key)
              ? window.sessionStorage.getItem(key)
              : val
          } </strong>`;
        avatar.appendChild(image);
        avatar.appendChild(MSSV);
        const input = Tag("input");
        input.type = Number.isInteger(val) ? "number" : "text";
        input.value = window.sessionStorage.getItem(key)
          ? window.sessionStorage.getItem(key)
          : val;
        input.name = key;
        avatar.appendChild(input);
        info_container_body.appendChild(avatar);
        continue;
      }
      const info_item = Tag("div", "info-item");
      info_item.innerHTML =
        `<em>${key}</em>` +
        "&nbsp&nbsp&nbsp&nbsp:&nbsp" +
        `<strong>${
          title === "THÔNG TIN SINH VIÊN"
            ? window.sessionStorage.getItem(key)
            : val
        }</strong>`;
      if (title === "THÔNG TIN SINH VIÊN") {
        const input = Tag("input");
        input.type = Number.isInteger(val) ? "number" : "text";
        input.value = window.sessionStorage.getItem(key)
          ? window.sessionStorage.getItem(key)
          : val;
        input.name = key;
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
