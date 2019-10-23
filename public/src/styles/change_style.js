import { colors } from './default_style';

export const changeButtonColorToMain = (element, innerValue) => {
  element.innerHTML = innerValue;
  element.style.backgroundColor = colors.main;
  element.style.color = 'white';
};
