import "./sass/style.scss";

const images = [
  ...document.querySelectorAll(".benefit__image"),
  ...document.querySelectorAll(".logo__image"),
];
const darkModeBtn = document.querySelector(".utils__btn--dark-mode");
darkModeBtn.addEventListener("click", e => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    e.target.innerText = "light mode";
    changeImages(images, true);
  } else {
    e.target.innerText = "dark mode";
    changeImages(images);
  }
});

const changeImages = (images, isDarkMode) => {
  images.forEach(image => {
    const imageSrc = image.getAttribute("src");
    const [fullPath, extension] = imageSrc
      .match(/([\w-/]+)(\.(svg|png|jpg))/i)
      .splice(1, 2);

    const newImageSrc = isDarkMode
      ? `${fullPath}-dark-mode${extension}`
      : fullPath.replace("-dark-mode", "") + extension;

    image.setAttribute("src", newImageSrc);
  });
};
