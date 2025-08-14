import { useState } from "react";
import "./Inventory.css";
import Toolbar from "./Toolbar";
import InventoryView from "./InventoryView";
import { data } from "react-router-dom";
// get inv by user ID
const invMockData = [
  {
    _id: "6897abaac39da249b3985543",
    userId: "68973717f23adacd60fcc7c4",
    moduleId: "6897388af21afe48623540de",
    quantity: 9,
    __v: 0,
  },
];

// list of module ids in active inventory
const moduleIds = invMockData.map((item) => item.moduleId);

// make fetch search all module by id with list of ids
// moduleMockData is palceholder for fetched data
const moduelMockData = [
  {
    image: {
      url: "/static/modules/68973717f23adacd60fcc7c4/1754751977970-848322317.png",
      key: "modules/68973717f23adacd60fcc7c4/1754751977970-848322317.png",
      mimeType: "image/png",
      size: 1224796,
    },
    _id: "6897388af21afe48623540de",
    name: "Arduino nano",
    model: "Nano",
    description: "test desc",
    category: ["sensor", "input"],
    owner: "68973717f23adacd60fcc7c4",
    __v: 0,
  },
  {
    image: {
      url: "/static/modules/68973717f23adacd60fcc7c4/1754754154426-64391860.png",
      key: "modules/68973717f23adacd60fcc7c4/1754754154426-64391860.png",
      mimeType: "image/png",
      size: 1224796,
    },
    _id: "68976c6acbf13bc2ed80d736",
    name: "Red 5mm LED",
    description: "test desc update",
    category: ["output", "test"],
    owner: "68973717f23adacd60fcc7c4",
    __v: 0,
  },
];

// for fitler. get all category. delete dupplicates
const allCategories = moduelMockData.reduce((acc, curr) => {
  // Check if curr.category is an array before calling forEach
  if (Array.isArray(curr.category)) {
    curr.category.forEach((cat) => {
      if (!acc.includes(cat)) {
        acc.push(cat);
      }
    });
  } else {
    console.warn("curr.category is not an array:", curr.category);
  }
  return acc;
}, []);
console.log("allCategories", allCategories);

// merge inv and module data
const prepedData = invMockData.map((invItem) => {
  const module = moduelMockData.find((mod) => mod._id === invItem.moduleId);
  return {
    ...module,
    quantity: invItem.quantity,
    invId: invItem._id,
  };
});
console.log(prepedData);
// list of users modules in active inventory with quantity and invId
// example data
// [
//   {
//     "image": {
//         "url": "/static/modules/68973717f23adacd60fcc7c4/1754751977970-848322317.png",
//         "key": "modules/68973717f23adacd60fcc7c4/1754751977970-848322317.png",
//         "mimeType": "image/png",
//         "size": 1224796
//     },
//     "_id": "6897388af21afe48623540de",
//     "model": "Nano",
//     "name": "Arduino nano",
//     "description": "test desc",
//     "category": [
//         "sensor",
//         "input"
//     ],
//     "owner": "68973717f23adacd60fcc7c4",
//     "__v": 0,
//     "quantity": 9,
//     "invId": "6897abaac39da249b3985543"
//   }
// ]
function Inventory() {
  const [viewMode, setViewMode] = useState("row");
  const [filter, setFilter] = useState("");

  return (
    <div className="inventory">
      <Toolbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        filter={filter}
        setFilter={setFilter}
        allCategories={allCategories}
      />

      <InventoryView viewMode={viewMode} data={prepedData} />
    </div>
  );
}

export default Inventory;
