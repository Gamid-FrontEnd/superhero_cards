const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");

const app = express();
const router = express.Router();

app.use(cors());
const PORT = 5000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://superhero-cards.appspot.com",
});

const db = admin.firestore();
let bucket = admin.storage().bucket();

app.use(express.json());
app.use("/", router);

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get("/cards", async (req, res) => {
  try {
    const cardsRef = db.collection("cards");
    const snapshot = await cardsRef.get();

    if (snapshot.empty) {
      return res.status(404).send("No cards found");
    }

    let cards = [];
    snapshot.forEach((doc) => cards.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).send("Error fetching cards: " + error.message);
  }
});

router.post("/cards", upload.array("images", 10), async (req, res) => {
  try {
    const {
      nickname,
      catch_phrase,
      origin_description,
      real_name,
      superpowers,
    } = req.body;

    // if (
    //   !nickname ||
    //   !catch_phrase ||
    //   !origin_description ||
    //   !real_name ||
    //   !superpowers
    // ) {
    //   return res.status(400).send("Missing required fields.");
    // }

    const files = req.files;

    const imageUrls = [];

    if (files.length === 0) {
      imageUrls.push(
        "https://img.freepik.com/free-vector/no-people-sign_78370-7014.jpg"
      );
    } else {
      for (const file of files) {
        const blob = bucket.file(
          `superheroe_images/${Date.now()}_${file.originalname}`
        );
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        await new Promise((resolve, reject) => {
          blobStream.on("error", reject);
          blobStream.on("finish", resolve);
          blobStream.end(file.buffer);
        });

        await blob.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        imageUrls.push(publicUrl);
      }
    }

    const newCard = {
      nickname: nickname || "no nickname",
      catch_phrase: catch_phrase || "no catch phrase",
      origin_description: origin_description || "no origin description",
      real_name: real_name || "no real name",
      superpowers: superpowers || "no superpowers",
      images: imageUrls,
    };

    const cardRef = await db.collection("cards").add(newCard);

    res.status(201).json({ id: cardRef.id, ...newCard });
  } catch (error) {
    res.status(500).send("Error creating card: " + error.message);
  }
});

router.put("/cards/:id", upload.array("images", 10), async (req, res) => {
  try {
    const cardId = req.params.id;
    const {
      nickname,
      catch_phrase,
      origin_description,
      real_name,
      superpowers,
      updatedImages,
    } = req.body;

    const files = req.files;

    if (
      !nickname &&
      !catch_phrase &&
      !origin_description &&
      !real_name &&
      !superpowers &&
      !updatedImages
    ) {
      return res.status(400).send("At least one field must be provided");
    }

    const updatedImagesArray = JSON.parse(updatedImages);

    const imageUrls = updatedImagesArray;

    for (const file of files) {
      const blob = bucket.file(
        `superheroe_images/${Date.now()}_${file.originalname}`
      );
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        blobStream.on("error", reject);
        blobStream.on("finish", resolve);
        blobStream.end(file.buffer);
      });

      await blob.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      imageUrls.push(publicUrl);
    }

    const cardRef = db.collection("cards").doc(cardId);
    const cardDoc = await cardRef.get();

    if (!cardDoc.exists) {
      return res.status(404).send("Card not found");
    }

    const updatedCard = {};
    updatedCard.nickname = nickname;
    updatedCard.catch_phrase = catch_phrase;
    updatedCard.origin_description = origin_description;
    updatedCard.real_name = real_name;
    updatedCard.superpowers = superpowers;
    updatedCard.images = imageUrls;

    await cardRef.update(updatedCard);

    res.status(200).json({ id: cardId, ...updatedCard });
  } catch (error) {
    res.status(500).send("Error updating card: " + error.message);
  }
});

app.delete("/cards/:id", async (req, res) => {
  try {
    const cardId = req.params.id;
    const cardRef = db.collection("cards").doc(cardId);

    const cardDoc = await cardRef.get();

    if (!cardDoc.exists) {
      return res.status(404).send("Card not found");
    }

    await cardRef.delete();

    res.status(200).send(`Card with ID ${cardId} deleted`);
  } catch (error) {
    res.status(500).send("Error deleting card: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
