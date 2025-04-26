const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/RequireAuth");
const Request = mongoose.model("Request");
const Reply = mongoose.model("Reply");
const User = mongoose.model("User");
const router = express.Router();
router.use(requireAuth);
router.get("/requests", async (req, res) => {
  const requests = await Request.find({});
  res.send(requests);
});
router.post("/requests", async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res
      .status(422)
      .send({ error: "Title, description, and category are required." });
  }
  try {
    const request = new Request({
      title,
      description,
      category,
      userId: req.user._id,
    });
    await request.save();
    res.send(request);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});
router.get("/requests/:requestId/replies", async (req, res) => {
  const { requestId } = req.params;
  try {
    const replies = await Reply.find({ requestId: requestId });

    // Transform the replies to include the username directly
    const transformedReplies = await Promise.all(
      replies.map(async (reply) => {
        const user = await User.findById(reply.userId);
        return {
          ...reply.toObject(),
          username: user ? user.name : "Unknown User",
        };
      })
    );

    res.send(transformedReplies);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/requests/:requestId/replies", async (req, res) => {
  const { replyText } = req.body;
  const { requestId } = req.params;

  if (!requestId || !replyText) {
    return res
      .status(422)
      .send({ error: "Request ID and reply text are required." });
  }

  try {
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).send({ error: "Request not found." });
    }

    // Fetch the user's details
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    const reply = new Reply({
      replyText,
      requestId,
      userId: req.user._id,
    });
    await reply.save();

    // Transform the reply to include the username directly
    const transformedReply = {
      ...reply.toObject(),
      username: user.name, // Use the fetched user's name
    };

    res.status(201).send(transformedReply);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});
module.exports = router;
