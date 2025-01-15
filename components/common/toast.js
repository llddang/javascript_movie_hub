import { ToastType } from "../../types/toast.type.js";

export class Toast {
  constructor() {}

  static icons = {
    [ToastType.INFO]: {
      color: "#74C0FC",
      classes: ["fa-solid", "fa-circle-info"],
    },
    [ToastType.ERROR]: {
      color: "#FD7272",
      classes: ["fa-solid", "fa-circle-exclamation"],
    },
  };

  static info(message) {
    const toastContainer =
      document.getElementsByClassName("toast-container")[0];
    const toast = this.createToast(message, ToastType.INFO);

    if (toastContainer) toastContainer.append(toast);
  }

  static error(message) {
    const toastContainer =
      document.getElementsByClassName("toast-container")[0];
    const toast = this.createToast(message, ToastType.ERROR);

    if (toastContainer) toastContainer.append(toast);
  }

  static createToast(message, type) {
    const toastIcon = this.createToastIcon(type);
    const toastBar = this.createToastBar(type);
    const toast = this.createToastContent(toastIcon, toastBar, message);

    toast.addEventListener("mouseenter", () => {
      const currentRight = window
        .getComputedStyle(toastBar)
        .getPropertyValue("right");

      toastBar.style.right = currentRight;
      toastBar.style.transition = "none";
    });

    toast.addEventListener("mouseout", () => {
      toastBar.style.right = "100%";
      toastBar.style.transition = "right 3s linear";
    });

    toastBar.addEventListener("transitionend", () => {
      toast.remove();
    });

    setTimeout(() => {
      toastBar.style.right = "100%";
    }, 50);

    return toast;
  }

  static createToastIcon(type) {
    const toastIcon = document.createElement("i");
    toastIcon.classList.add(...this.icons[type].classes);
    toastIcon.classList.add("toast-icon");
    toastIcon.style.color = this.icons[type].color;

    return toastIcon;
  }

  static createToastBar(type) {
    const toastBar = document.createElement("div");
    toastBar.setAttribute("class", "toast-bar");
    toastBar.style.background = this.icons[type].color;

    return toastBar;
  }

  static createToastContent(toastBar, toastIcon, message) {
    const toast = document.createElement("li");
    toast.setAttribute("class", "toast");
    toast.append(toastBar);
    toast.append(toastIcon);
    toast.append(message);

    return toast;
  }
}
