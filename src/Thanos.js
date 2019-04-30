import html2canvas from 'html2canvas';
import './thanos.css';

const LAYER = 32;
const TRANSITION_DURATION = 1.5;
const TRANSITION_DELAY = 1.35;
const effectWrap = document.createElement('div');
effectWrap.id = 'effect';

function sampler(imgDatas, sourceImgData, width, height, layerCount) {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      for (let l = 0; l < 2; l++) {
        // random piece index which tend to grow with x
        const pieceIndex = Math.floor(
          (layerCount * (Math.random() + (2 * x) / width)) / 3,
        );
        const pixelPos = 4 * (y * width + x);
        for (let rgbaIndex = 0; rgbaIndex < 4; rgbaIndex++) {
          const dataPos = pixelPos + rgbaIndex;
          imgDatas[pieceIndex].data[dataPos] = sourceImgData.data[dataPos];
        }
      }
    }
  }
}

function snap(element) {
  effectWrap.innerHTML = '';
  element.before(effectWrap);

  const rect = element.getBoundingClientRect();
  effectWrap.style.left = rect.left;
  effectWrap.style.top = element.offsetTop;
  effectWrap.style.width = rect.width;
  effectWrap.style.height = rect.height;

  html2canvas(element, {
    backgroundColor: null,
  }).then(canvas => {
    const context = canvas.getContext('2d');
    const { width, height } = canvas;

    // get element imageData
    const imgData = context.getImageData(0, 0, width, height);

    // init empty imageData
    const effectImgDatas = [];
    for (let i = 0; i < LAYER; i++) {
      effectImgDatas.push(context.createImageData(width, height));
    }

    sampler(effectImgDatas, imgData, width, height, LAYER);

    // create cloned canvases
    for (let i = 0; i < LAYER; i++) {
      const canvasClone = canvas.cloneNode();
      canvasClone.getContext('2d').putImageData(effectImgDatas[i], 0, 0);
      const c = canvasClone;

      const transitionDelay = TRANSITION_DELAY * (i / LAYER);
      c.style.transitionDelay = transitionDelay;
      effectWrap.appendChild(c);

      setTimeout(() => {
        const rotate1 = 15 * (Math.random() - 0.5);
        const rotate2 = 15 * (Math.random() - 0.5);
        const fac = 2 * Math.PI * (Math.random() - 0.5);
        const translateX = 60 * Math.cos(fac);
        const translateY = 30 * Math.sin(fac);

        c.style.transform = `rotate(${rotate1}deg) translate(${translateX}px, ${translateY}px) rotate(${rotate2}deg)`;
        c.style.opacity = 0;

        const removeDelay = 1e3 * (TRANSITION_DURATION + 1 + Math.random());

        setTimeout(() => {
          c.parentNode.removeChild(c);
        }, removeDelay);
      }, 0);

      element.style.transition = `opacity ${TRANSITION_DURATION} ease`;
      element.style.opacity = 0;
      setTimeout(() => {
        element.style.visibility = 'hidden';
      }, 1e3 * TRANSITION_DURATION);
    }
  });
}

export default {
  snap,
};
