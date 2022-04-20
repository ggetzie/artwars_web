import Shop from "./Shop";
import List from "./List";
import Buy from "./Buy";
export type ShopStackParamList = {
  List: undefined;
  Buy: {name: string};
};

export {Shop, List, Buy};
