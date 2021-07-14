import gsap from "gsap";

class DarkMode {
  constructor() {
    this.darkModeBtn = document.querySelector(".utils__btn--dark-mode");
    this.darkModeSvg = document.querySelector(".utils__btn--dark-mode path");
    this.images = [
      ...document.querySelectorAll(".benefit__image"),
      ...document.querySelectorAll(".logo__image"),
    ];
    this.isDarkMode = document.body.classList.contains("dark-mode");
    this.moonPath =
      "M56 200C56 342.5 200 400 200 400C89.5431 400 0 310.457 0 200C0 89.543 89.5431 0 200 0C200 0 56 61.2049 56 200Z";
    this.sunPath =
      "M400 200C400 310.457 310.457 400 200 400C89.5431 400 0 310.457 0 200C0 89.5431 89.5431 0 200 0C310.457 0 400 89.5431 400 200Z";
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
  changeDarkModeBtn() {
    const tl = gsap.timeline();
    if (this.isDarkMode) {
      tl.fromTo(
        this.darkModeSvg,
        { rotation: 200 },
        {
          rotation: 360,
          duration: 0.2,
        }
      ).fromTo(
        this.darkModeSvg,
        { attr: { d: this.moonPath } },
        { attr: { d: this.sunPath }, duration: 0.2 }
      );
    } else {
      tl.fromTo(
        this.darkModeSvg,
        { attr: { d: this.sunPath } },
        { svgOrigin: "200px 200px", attr: { d: this.moonPath }, duration: 0.2 }
      ).fromTo(
        this.darkModeSvg,
        { rotation: 0 },
        {
          rotation: 200,
          duration: 0.3,
        }
      );
    }
  }

  updateDarkModeContent() {
    this.changeDarkModeBtn();
    this.changeImages();
  }

  start() {
    this.updateDarkModeContent();
    this.darkModeBtn.addEventListener("click", () =>
      this.handleDarkModeChange()
    );
    this.darkModeBtn.addEventListener("touchstart", () =>
      this.handleDarkModeChange()
    );
  }
}
export default DarkMode;
