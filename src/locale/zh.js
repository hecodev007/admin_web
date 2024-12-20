import Data from "./en";
let obj = {};
for (const key in Data) {
  obj[key] = key;
}
const cn = {
  请输入: "请输入 %{text}",
  请选择: "请选择 %{text}"
};
export default Object.assign(obj, cn);
