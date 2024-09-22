export const loadStylingMotion = (
  isItInView: boolean,
  delayInSeconds: number,
) => {
  return {
    transform: isItInView ? "none" : "translateY(30px)",
    opacity: isItInView ? 1 : 0,
    transition: `all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) ${delayInSeconds}s`,
  };
};
