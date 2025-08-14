import ItemRow from "./ItemRow";
import ItemCard from "./ItemCard";
import "./InventoryView.css";
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
//     "name": "Arduino nano",
//     "model": "Nano",
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

// This can be optimized with memoization
function InventoryView({ viewMode, data }) {
  if (viewMode === "grid") {
    return (
      <div className="inventory-view inventory-view_grid">
        {data.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    );
  }
  return (
    <div className="inventory-view">
      {data.map((item) => (
        <ItemRow key={item._id} item={item} />
      ))}
    </div>
  );
}

export default InventoryView;
