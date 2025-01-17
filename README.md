<p align="center"><a href="https://nodei.co/npm/bucksh0t.db"><img src="https://nodei.co/npm/bucksh0t.db.png"></a></p>

<p align="center"><img src="https://img.shields.io/npm/v/bucksh0t.db?style=for-the-badge"> <img src="https://img.shields.io/github/repo-size/bucksh0tdev/bucksh0t.db?style=for-the-badge"> <img src="https://img.shields.io/npm/l/bucksh0t.db?style=for-the-badge"> <img src="https://img.shields.io/npm/dt/bucksh0t.db?style=for-the-badge"> <img src="https://img.shields.io/github/contributors/bucksh0tdev/bucksh0t.db?style=for-the-badge"></p>

# bucksh0t.db

**Examples:**
```js
// Data Set | Get | Add
db.set("KEY", "DATA"); // Change Data And Result Data
db.get("KEY"); // Result Data
db.add("KEY"); // Change Data And Result Data
db.fetch("KEY"); // Result Data
db.push("KEY.KEY", "data"); // Push Datas Json or Array

// Data All

db.all("OPTIONAL MAX DATAS NUMBER"); // All Datas

// Data exists

db.has("KEY"); // True/False

// Data Count

db.size(); // All Data Length

// Created Notification
db.on("create", (datas) => {
    console.log(`Created Data Name: "${datas.key}", Value: "${datas.value}"`);
});

// Updated Notification
db.on("update", (datas) => {
    console.log(`Updated Data Name: "${datas.key}", Last Value: "${datas.last}", New Value: "${datas.new}"`);
});

// Deleted Notification
db.on("delete", (datas) => {
    console.log(`Deleted Data Name: "${datas.key}", Value: "${datas.value}"`);
});
```

**Main Data**
```js
const db = require("bucksh0t.db");
```

**Multiple Data**
```js
const bucksh0t = require("bucksh0t.db");
const db = new bucksh0t.create("datas.json", 0); // ({PATH}, {MAX})
```