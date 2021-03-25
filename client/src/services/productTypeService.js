import _ from "lodash";

export const productTypes = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Toys & Games" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Office Supplies" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Free Stuff" },
];

export function getProductTypes() {
  //return productTypes.filter((pt) => pt);
  return _.orderBy(productTypes, "name", "asc");
}
