export class Modal {
  constructor(title, onClose, children) {
    console.log(typeof onClose);

    this.onClose = onClose;

    const modalContent = this.createModalContent(children);
    const modalCloseButton = this.createModalCloseButton();
    const modalTitle = this.createModalTitle(title);
    const modalHead = this.createModalHead(modalTitle, modalCloseButton);
    const modalContainer = this.createModalContainer(modalHead, modalContent);

    const modalBackdrop = this.createModalBackdrop();

    this.modalBackdrop = modalBackdrop;
    this.modal = modalContainer;
  }

  createModalBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.setAttribute("class", "modal-backdrop");

    backdrop.addEventListener("click", this.handleClose.bind(this));

    return backdrop;
  }

  createModalContainer(modalHead, modalContent) {
    const modalContainer = document.createElement("div");
    modalContainer.setAttribute("class", "modal-container");

    modalContainer.append(modalHead);
    modalContainer.append(modalContent);

    return modalContainer;
  }

  createModalHead(modalTitle, modalCloseButton) {
    const modalHead = document.createElement("div");
    modalHead.setAttribute("class", "modal-head");

    modalHead.append(modalTitle);
    modalHead.append(modalCloseButton);

    return modalHead;
  }

  createModalTitle(title) {
    const modalTitle = document.createElement("p");
    modalTitle.innerText = title;
    modalTitle.setAttribute("class", "modal-title");

    return modalTitle;
  }

  createModalCloseButton() {
    const closeModalButton = document.createElement("button");
    const closeIcon = document.createElement("i");
    closeIcon.setAttribute("class", "fa-solid fa-xmark modal-close-icon");
    closeModalButton.append(closeIcon);

    closeModalButton.addEventListener("click", this.handleClose.bind(this));

    return closeModalButton;
  }

  createModalContent(children) {
    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");

    modalContent.append(children);

    return modalContent;
  }

  handleClose(e) {
    document.body.style.overflow = "auto";
    this.onClose();

    this.modal.remove();
    this.modalBackdrop.remove();
  }
}
