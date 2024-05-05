import sideBarContent from "../json/sideBarContent.json" assert { type: "json" };

const main = document.getElementById("main");

const Tag = (tagName, className) => {
  const tag = document.createElement(tagName);
  if (className) tag.classList.add(className);
  return tag;
};
const Normalization = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");

  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str
    .normalize("NFD")
    .replace("[^\\p{ASCII}]", "")
    .toLowerCase()
    .replace("\\s{2,}", " ")
    .trim();
};

var TTCN = [
  {
    name: "Thông tin sinh viên",
    content: [],
  },
];
var MSSV = "_20215244";

/* All necessary functions */
const handleAddGroup = () => {
  console.log("Add new group");
  TTCN.push({
    name: "Group Item",
    content: [],
  });
  clearInfo();
  readData();
};
const handleDeleteGroup = (groupIndex) => {
  console.log(`Delete group ${groupIndex}`);
  TTCN.splice(groupIndex, 1);
  clearInfo();
  readData();
};
const handleAddItem = (groupIndex) => {
  console.log(`Add new item at group ${groupIndex}`);
  TTCN[groupIndex].content.push({
    name: "Info Item Name",
    value: "",
  });
  clearInfo();
  readData();
};
const handleDeleteItem = (groupIndex, itemIndex) => {
  console.log(`Delete item ${itemIndex} at group ${groupIndex}`);
  TTCN[groupIndex].content.splice(itemIndex, 1);
  clearInfo();
  readData();
};
const handleChangeValue = (groupIndex, itemIndex, value) => {
  console.log(`${groupIndex} - ${itemIndex} - ${value}`);
  TTCN[groupIndex].content[itemIndex].value = value;
};
const clearInfo = () => {
  const info_section_body = document.getElementById("info-section-body");
  info_section_body.innerHTML = "";
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
const file_pdf = Tag("i", "bi");
file_pdf.classList.add("bi-file-pdf");
file_pdf.id = "pdf-download";
info_section_header.appendChild(file_pdf);
const hr = Tag("hr");
info_section_header.appendChild(hr);
const info_section_body = Tag("div", "info-section-body");
info_section_body.id = "info-section-body";
const sexOptions = ["Nam", "Nữ", "None"];
const listSpecial = ["sex", "gioi tinh"];
const readData = () => {
  console.log(TTCN);
  TTCN.forEach((group, groupIndex) => {
    const group_info_container = Tag("div", "group-info-container");
    // Header
    const group_info_header = Tag("div", "group-info-header");
    const group_name_container = Tag("div", "group-name-container");
    group_name_container.id = `group_${groupIndex}`;
    const group_name = Tag("span", "group-name");
    group_name.innerHTML = group.name + MSSV;
    const group_name_input = Tag("input", "group-name-input");
    group_name_input.type = "text";
    group_name_input.value = group.name;
    const trash_icon = Tag("i", "bi");
    trash_icon.classList.add("bi-trash");
    trash_icon.onclick = () => handleDeleteGroup(groupIndex);
    group_name_container.appendChild(group_name);
    group_name_container.appendChild(group_name_input);
    if (group.name !== "Thông tin sinh viên")
      group_name_container.appendChild(trash_icon);
    group_name.ondblclick = () => {
      if (group.name === "Thông tin sinh viên") return;
      const element = document.getElementById(`group_${groupIndex}`);
      const input = element.querySelector("input");
      element.classList.add("editable");
      input.focus();
    };
    group_name_input.onblur = () => {
      const element = document.getElementById(`group_${groupIndex}`);
      element.classList.remove("editable");
      const input = element.querySelector("input");
      // TTCN[groupIndex].name = input.value;
      clearInfo();
      readData();
    };
    group_name_input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const element = document.getElementById(`group_${groupIndex}`);
        element.classList.remove("editable");
        const input = element.querySelector("input");
        TTCN[groupIndex].name = input.value;
        clearInfo();
        readData();
      }
    });
    const group_buttons = Tag("div", "group-buttons");
    const add_item_button = Tag("button", "add-item-button");
    add_item_button.innerText = "Add item info";
    add_item_button.addEventListener("click", () => handleAddItem(groupIndex));
    const add_group_button = Tag("button", "add-group-button");
    add_group_button.innerText = "Add group info";
    add_group_button.addEventListener("click", () => handleAddGroup());
    const border = Tag("div", "border");
    group_buttons.appendChild(border);
    group_buttons.appendChild(add_item_button);
    group_buttons.appendChild(add_group_button);
    group_info_header.appendChild(group_name_container);
    group_info_header.appendChild(group_buttons);
    // Body
    const group_info_body = Tag("div", "group-info-body");
    group.content.forEach((info, itemIndex) => {
      const info_item = Tag("div", "info-item");
      const info_name_container = Tag("div", "info-name-container");
      info_name_container.id = `item_${groupIndex}_${itemIndex}`;
      const info_name = Tag("span", "info-name");
      info_name.innerHTML = info.name;
      const info_name_input = Tag("input", "info-name-input");
      info_name_input.type = "text";
      info_name_input.value = info.name;
      const trash_icon = Tag("i", "bi");
      trash_icon.classList.add("bi-trash");
      trash_icon.onclick = () => handleDeleteItem(groupIndex, itemIndex);
      info_name_container.appendChild(info_name);
      info_name_container.appendChild(info_name_input);
      info_name.ondblclick = () => {
        const element = document.getElementById(
          `item_${groupIndex}_${itemIndex}`
        );
        const input = element.querySelector("input");
        element.classList.add("editable");
        input.focus();
      };
      info_name_input.onblur = () => {
        const element = document.getElementById(
          `item_${groupIndex}_${itemIndex}`
        );
        element.classList.remove("editable");
        const input = element.querySelector("input");
        // TTCN[groupIndex].content[itemIndex].name = input.value;
        clearInfo();
        readData();
      };
      info_name_input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const element = document.getElementById(
            `item_${groupIndex}_${itemIndex}`
          );
          element.classList.remove("editable");
          const input = element.querySelector("input");
          TTCN[groupIndex].content[itemIndex].name = input.value;
          clearInfo();
          readData();
        }
      });
      const info_item_input = Tag(
        !listSpecial.includes(Normalization(info.name)) ? "input" : "select",
        "info-item-input"
      );
      if (!listSpecial.includes(Normalization(info.name))) {
        info_item_input.type = "text";
        info_item_input.value = info.value;
        info_item_input.onchange = (event) =>
          handleChangeValue(groupIndex, itemIndex, event.target.value);
      } else {
        info_item_input.id = "info-select";
        sexOptions.forEach((sex) => {
          const option = Tag("option");
          option.value = sex;
          option.innerText = sex;
          info_item_input.appendChild(option);
        });
        info_item_input.value = info.value === "" ? "None" : info.value;
        info_item_input.onchange = () => {
          const select = document.querySelector("select");
          console.log("Select : ", select.value);
          handleChangeValue(groupIndex, itemIndex, select.value);
        };
      }
      info_item.appendChild(info_name_container);
      info_item.appendChild(info_item_input);
      info_item.appendChild(trash_icon);
      group_info_body.appendChild(info_item);
    });
    group_info_container.appendChild(group_info_header);
    group_info_container.appendChild(group_info_body);
    info_section_body.appendChild(group_info_container);
  });
};
readData();
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
// const note = Tag("div", "ghi-chu");
// note.innerHTML =
//   "<strong>Ghi chú</strong>: Nếu sinh viên thấy thông tin của mình chưa chính xác, xin vui lòng liên hệ phòng Đào tạo để cập nhật lại.";
// info_section_body.appendChild(note);

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
