class Utils {
  constructor() {
    this.darkModeBtn = document.querySelector(".utils__btn--dark-mode");
    this.images = [
      ...document.querySelectorAll(".benefit__image"),
      ...document.querySelectorAll(".logo__image"),
    ];
    this.isDarkMode = document.body.classList.contains("dark-mode");
  }

  handleDarkModeChange() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle("dark-mode");
    this.updateDarkModeContent();
  }

  changeImages() {
    this.images.forEach(image => {
      const imageSrc = image.getAttribute("src");
      const [fullPath, extension] = imageSrc
        .replace("-dark-mode", "")
        .match(/([\w-/]+)(\.(svg|png|jpg))/i)
        .splice(1, 2);

      const newImageSrc = this.isDarkMode
        ? `${fullPath}-dark-mode${extension}`
        : `${fullPath}${extension}`;

      image.setAttribute("src", newImageSrc);
    });
  }

  updateDarkModeContent() {
    this.darkModeBtn.innerText = this.isDarkMode ? "light mode" : "dark mode";
    this.changeImages();
  }

  startDarkMode() {
    this.updateDarkModeContent();
    this.darkModeBtn.addEventListener("click", () =>
      this.handleDarkModeChange()
    );
    this.darkModeBtn.addEventListener("touchstart", () =>
      this.handleDarkModeChange()
    );
  }
}
export default Utils;
