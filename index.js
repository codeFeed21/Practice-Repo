const express = require("express");

const app = express();

const port = 3000;

const items = [
  {
    name: "Item1",
    itemType: [
      {
        isSilver: true,
      },
      {
        isGold: true,
      },
    ],
  },
];

app.get("/items", function (req, res) {
  const totalItems = items[0].itemType;
  const numberOfItems = totalItems.length;
  let numberOfSilverItems = 0;
  for (let i = 0; i < numberOfItems; i++) {
    if (totalItems[i].isSilver) {
      numberOfSilverItems++;
    }
  }

  const numberOfGoldItems = numberOfItems - numberOfSilverItems;

  res.json({
    numberOfItems,
    numberOfSilverItems,
    numberOfGoldItems,
  });
});

app.use(express.json());

app.post("/add-items", function (req, res) {
  const gold = req.body.gold;
  items[0].itemType.push({
    isGold: true,
  });
  res.json({
    msg: "Added Gold!",
  });
});

app.put("/update", function (req, res) {
  for (let i = 0; i < items[0].itemType.length; i++) {
    items[0].itemType[i].isSilver = true;
  }
  res.json({});
  console.log("Update request received");
});

app.delete("/remove", function (req, res) {
  const newArr = [];
  for(let i = 0; i < items[0].itemType.length; i++){
    if(items[0].itemType[i].isSilver == true){
      newArr.push({
        isGold:true
      })
    }
  }
  items[0].itemType = newArr;
  res.send("Product removed... !");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
