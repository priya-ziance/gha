import { TABLE_WIDTH } from "./constants";

export const getTableWith = function(widthDecimal: number) {
  return widthDecimal * TABLE_WIDTH;
}
