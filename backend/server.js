const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Request = require("./models/Request");
const Contact = require("./models/Contact");

const app = express();

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// MONGODB CONNECTION
// ==========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// ==========================
// TEST ROUTE (IMPORTANT DEBUG)
// ==========================
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// ==========================
// HOME ROUTE
// ==========================
app.get("/", (req, res) => {
  res.send("SkillSwitch Backend Running");
});

// ==========================
// REGISTER ROUTE
// ==========================
app.post("/api/register", async (req, res) => {
    console.log(req.body); // IMPORTANT DEBUG
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = new User({
      name,
      email,
      password,
      skillHave: "",
      skillWant: "",
      rate: 0
    });

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// LOGIN ROUTE
// ==========================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const profileComplete =
      user.skillHave &&
      user.skillWant &&
      user.rate;

    res.json({
      success: true,
      user,
      profileComplete: Boolean(profileComplete)
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// REQUEST ROUTE
// ==========================
app.post("/api/request", async (req, res) => {
  try {
    const request = new Request({
      ...req.body,
      receiverEmail: req.body.receiverEmail.trim().toLowerCase(),
      senderEmail: req.body.senderEmail.trim().toLowerCase(),
    });

    await request.save();

    res.json({ success: true, request });

  } catch (error) {
    console.log(error);
  }
});

app.get("/api/request/inbox/:email", async (req, res) => {
  try {
    const { email } = req.params;

    console.log("INBOX REQUEST FOR:", email);

    const requests = await Request.find({
      receiverEmail: email,
      status: "pending"
    });

    console.log("FOUND REQUESTS:", requests);

    res.json({
      success: true,
      requests
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/request/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      request
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// BROWSE ROUTE
// ==========================
app.get("/api/browse", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      users
    });

  } catch (error) {
    console.log("BROWSE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// PROFILE UPDATE ROUTE
// ==========================
app.put("/api/profile-setup/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      skillHave,
      skillWant,
      rate,
      address,
      qualification,
      isPro,
      hourlyRate,
      proBio
    } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        skillHave,
        skillWant,
        rate,
        address,
        qualification,
        isPro,
        hourlyRate,
        proBio
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.log("PROFILE UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    console.log("CONTACT FORM:", req.body);

    const Contact = require("./models/Contact");

    const { email, message } = req.body;

    const contact = new Contact({
      email,
      message,
    });

    await contact.save();

    res.json({
      success: true,
      message: "Message saved",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// GET SINGLE USER PROFILE
// ==========================
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.log("USER PROFILE ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.put("/api/request/accept/:id", async (req, res) => {
  const updated = await Request.findByIdAndUpdate(
    req.params.id,
    { status: "accepted" },
    { new: true }
  );

  res.json({ success: true, request: updated });
});

app.put("/api/request/reject/:id", async (req, res) => {
  const updated = await Request.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );

  res.json({ success: true, request: updated });
});

app.put("/api/request/undo/:id", async (req, res) => {
  const updated = await Request.findByIdAndUpdate(
    req.params.id,
    { status: "pending" },
    { new: true }
  );

  res.json({ success: true, request: updated });
});

app.get("/api/request/report/:id", async (req, res) => {
  const request = await Request.findById(req.params.id);

  res.json({
    success: true,
    report: request
  });
});

app.get("/api/request/messages/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const requests = await Request.find({
      $or: [
        { receiverEmail: email },
        { senderEmail: email }
      ],
      status: { $in: ["accepted", "rejected"] }
    });

    res.json({
      success: true,
      requests
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// START SERVER
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});