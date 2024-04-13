import navBarContent from "../json/navBarContent.json" assert { type: "json" };
const main = document.getElementById("main");
const side_bar = main.getElementsByClassName("side-bar")[0];
const Tag = (tagName, className) => {
  const tag = document.createElement(tagName);
  if (className) tag.classList.add(className);
  return tag;
};
/* Navigation bar */
const nav = Tag("div", "nav-bar");
for (const [title, content] of Object.entries(navBarContent)) {
  if (content instanceof Array) {
    const dropdown = Tag("div", "dropdown");
    dropdown.addEventListener("mouseenter", function () {
      dropdown.classList.add("hovered");
    });
    dropdown.addEventListener("mouseleave", function () {
      setTimeout(function () {
        dropdown.classList.remove("hovered");
      }, 300);
    });
    const dropdown_title = Tag("div", "dropdown-title");
    const icon_left = Tag("img", "icon-left");
    icon_left.src = "resources/icons/arrange_back.png";
    const icon_right = Tag("img", "icon-right");
    icon_right.src = "resources/icons/chevron_down.png";
    const name = Tag("span", "");
    name.textContent = title;
    dropdown_title.appendChild(icon_left);
    dropdown_title.appendChild(name);
    dropdown_title.appendChild(icon_right);
    const dropdown_content = Tag("div", "dropdown-content");
    for (const { text, link } of content) {
      const dropdown_item = Tag("a", "dropdown-item");
      dropdown_item.href = link;
      dropdown_item.innerText = text;
      dropdown_content.appendChild(dropdown_item);
    }
    dropdown.appendChild(dropdown_title);
    dropdown.appendChild(dropdown_content);
    nav.appendChild(dropdown);
    continue;
  }
  const item = Tag("a", "item");
  const name = Tag("span", "");
  name.textContent = content.text;
  const icon = Tag("img", "");
  icon.src = "resources/icons/arrange_back.png";
  item.appendChild(icon);
  item.appendChild(name);
  item.href = content.link;
  nav.appendChild(item);
}
/* Responsive bar */
const responsive_bar = Tag("div", "responsive-bar");
responsive_bar.id = "responsive-bar";
const control_nav_bar = Tag("div", "control-nav-bar");
const menu_icon = Tag("i", "glyphicon");
menu_icon.classList.add("glyphicon-menu-hamburger");
control_nav_bar.appendChild(menu_icon);
const control_side_bar = Tag("div", "control-side-bar");
const menu_icon_2 = Tag("i", "glyphicon");
menu_icon_2.classList.add("glyphicon-menu-hamburger");
control_side_bar.appendChild(menu_icon_2);
responsive_bar.appendChild(control_side_bar);
responsive_bar.appendChild(control_nav_bar);
main.appendChild(responsive_bar);
main.appendChild(responsive_bar);
main.appendChild(nav);
