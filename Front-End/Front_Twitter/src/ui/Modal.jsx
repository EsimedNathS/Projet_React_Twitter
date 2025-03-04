import React from "react";
import ReactDOM from "react-dom";

export function openModal() {
  // Créer un élément div qui va contenir la modal
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-root";
  document.body.appendChild(modalContainer);

  // Afficher la modal dans cet élément
  ReactDOM.render(<LoginModal />, modalContainer);
}

// Fonction pour fermer la modal proprement
export function closeModal() {
  const modalContainer = document.getElementById("modal-root");
  if (modalContainer) {
    ReactDOM.unmountComponentAtNode(modalContainer);
    document.body.removeChild(modalContainer);
  }
}
