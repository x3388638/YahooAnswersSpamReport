import html2canvas from 'html2canvas'

function snap(element) {
  html2canvas(element).then(canvas => {
    element.appendChild(canvas);
  });
}

export default {
  snap
};
