const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

const users = [
  {
    id: 1,
    name: "Mike Oxlong",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    id: 2,
    name: "Charlie Kirk",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
  },
  {
    id: 3,
    name: "Muhammed Avdol",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 4,
    name: "Chandragupta Maurya",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: 5,
    name: "True Adam",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/69.jpg",
  },
  {
    id: 6,
    name: "John Pork",
    gender: "Male",
    image: "https://i.scdn.co/image/ab67616d0000b273ffe8ad517ca19e5e1edf2ff3",
  },
  {
    id: 7,
    name: "Tung Tung Tung Sahur",
    gender: "Sahur",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71WoV_KEKgm9MwJ8bkjfF5EdXrEig1Z929qanHDQdjg&s=10",
  },
];

// api server

//get all users gng pls jaldi
app.get("/api/users", function (req, res) {
  res.status(200).json(users);
});

function getUserById(uid) {
  for (let i = 0; i < users.length; i++) {
    if (uid == users[i].id) {
      return i;
    }
  }
  return -1;
}

app.get("/api/randomuser", function (req, res) {
  var n = users.length;
  const randomid = Math.floor(Math.random() * n);
  res.status(200).json(users[randomid]);
});

// ek hi de jaldi se
app.get("/api/users/:id", function (req, res) {
  var uid = req.params.id;
  var userid = getUserById(uid);

  if (userid == -1) {
    res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(users[userid]);
});

var newuserid = users.length + 1;

//get a new user (post)
app.post("/api/users", function (req, res) {
  if (!req.body.name || !req.body.gender || !req.body.image)
    return res.json({ message: " name, gender and image is required" });
  let user = req.body;
  user.id = newuserid;
  newuserid++;
  users.push(user);
  res.status(200).json({ message: "added successfully" });
});

app.put("/api/users/:id", function (req, res) {
  var userid = getUserById(req.params.id);

  if (userid == -1) return res.json({ message: "user not found" });

  if (req.body.name) users[userid].name = req.body.name;

  if (req.body.gender) users[userid].gender = req.body.gender;

  if (req.body.image) users[userid].image = req.body.image;

  return res
    .status(200)
    .json({ message: "user details updated", user: users[userid] });
});

app.delete("/api/users/:id", function (req, res) {
  var userid = getUserById(req.params.id);
  if (userid == -1) return res.json({ message: "user not found" });

  users.splice(userid, 1);

  res.status(200).json({ message: "user deleted successfully" });
});

app.use(express.static("frontend")); //web server
app.listen(port, function () {
  console.log("yes it worky :) at http://localhost:" + port);
});
