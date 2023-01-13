import express from "express";
import cors from "cors";
import { config } from "dotenv";
import multer from "multer";

config();

const app = express();

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
  storage
});

// app.post("/image", upload.single("file"), async (req, res) => {
  
//   console.log(req.file)
//     if (!req.file) {
//     console.log("No file uploaded");
//     res.send("No file uploaded");
//   } else {
//     console.log(req.file.filename);
//     res.send('Image uploaded successfuly');
//   }
// });

app.get("/", (req, res) => {
  res.json({ hello: "World" });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
