function removeAllChildren(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

function removeElement(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}