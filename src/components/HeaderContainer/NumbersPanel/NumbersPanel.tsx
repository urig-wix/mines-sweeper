import React from "react";
import { NumbersPanelProps } from "../../../types";
import s from "./NumbersPanel.module.css";

export function NumbersPanel(props: NumbersPanelProps) {
  const { value } = props;
  if (value > 999) {
    return renderByParams(9, 9, 9);
  }
  if (value >= 0) {
    const onesDigit = value % 10;
    const tensDigit = Math.floor((value / 10) % 10);
    const hundredsDigit = Math.floor(value / 100);
    return renderByParams(onesDigit, tensDigit, hundredsDigit);
  }
  if (value < -99) {
    return renderByParams(9, 9, "m");
  }
  const onesDigit = (-1 * value) % 10;
  const tensDigit = Math.floor(((-1 * value) / 10) % 10);
  return renderByParams(onesDigit, tensDigit, "m");
}

function renderByParams(
  onesDigit: number,
  tensDigit: number,
  hundredsDigitOrMinus: string | number
) {
  return (
    <div>
      <div data-testid="hundreds-digit-or-minus" className={`${s.numbers} ${s["d" + hundredsDigitOrMinus]}`}></div>
      <div data-testid="tens-digit" className={`${s.numbers} ${s["d" + tensDigit]}`}></div>
      <div data-testid="ones-digit" className={`${s.numbers} ${s["d" + onesDigit]}`}></div>
    </div>
  );
}
