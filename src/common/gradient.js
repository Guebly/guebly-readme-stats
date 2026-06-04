// @ts-check

/**
 * @param {string|string[]} bgColor Background color or gradient array.
 * @returns {{ bgFill: string, gradientDef: string }} Fill value and gradient SVG defs.
 */
const resolveGradient = (bgColor) => {
  if (typeof bgColor !== "object") {
    return { bgFill: bgColor, gradientDef: "" };
  }

  const angle = bgColor[0];
  const gradients = bgColor.slice(1);

  const gradientDef = `
    <defs>
      <linearGradient id="gradient" gradientTransform="rotate(${angle})" gradientUnits="userSpaceOnUse">
        ${gradients
          .map((grad, index) => {
            const offset = (index * 100) / (gradients.length - 1);
            return `<stop offset="${offset}%" stop-color="#${grad}" />`;
          })
          .join("")}
      </linearGradient>
    </defs>
  `;

  return { bgFill: "url(#gradient)", gradientDef };
};

export { resolveGradient };
