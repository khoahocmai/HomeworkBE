import express from "express";
import {
  DataResponse,
  NotFoundResponse,
  MessageResponse,
} from "../common/reponses.js";
import { requireRole } from "../middlewares/auth.js";
import Album from "../models/Album.js";
import Album_detail from "../models/Album_detail.js";
import Song from "../models/Song.js";

const router = express.Router();

// Function 14: Get album by name
router.get("/", requireRole("user"), async (req, res) => {
  const name = req.body.name;
  const album = await Album.findOne({
    where: {
      name: name,
    },
  });
  console.log(album)
  if (album == null) {
    res.json(NotFoundResponse("Not found"));
  } else {
    res.json(DataResponse(album));
  }
});

// Function 15: List all albums
router.get("/listAllAlbum", requireRole("user"), async (req, res) => {
  const albums = await Album.findAll();

  if (albums.length === 0) {
    res.json(MessageResponse("Not have any albums"));
  } else {
    res.json(DataResponse(albums));
  }
});

// Function 16: Create album
router.post("/", requireRole("user"), async (req, res) => {
  const name = req.body.name;
  const userID = res.locals.userData.id;

  const album = await Album.create({
    userID: userID,
    name: name,
    isPrivate: true,
  });
  res.json(MessageResponse("The album is create successfully"));
});

// Function 17: Add song into album
router.post("/:albumID/song/:songID", requireRole("user"), async (req, res) => {
  const albumID = parseInt(req.params.albumID);
  const songID = parseInt(req.params.songID);

  const al_de = await Album_detail.findOne({
    where: {
      albumID: albumID,
      songID: songID,
    },
  });
  if (al_de == null) {
    const song = await Song.findOne({
      where: {
        id: songID,
      },
    });
    if (song != null) {
      if (song.isPrivate == false) {
        const al_d = await Album_detail.create({
          albumID: albumID,
          songID: songID,
        });
        res.json(MessageResponse("The song is added"));
      } else {
        res.json(MessageResponse("The song is Privacy"));
      }
    } else {
      res.json(NotFoundResponse());
    }
  } else {
    res.json(MessageResponse("The song is duplicated"));
  }
});

// Function 18: Delete album by id
router.delete("/:albumID", requireRole("user"), async (req, res) => {
  const id = parseInt(req.params.albumID);

  const result = await Album.destroy({
    where: {
      id: id,
    },
  });
  if (result === 0) {
    res.json(NotFoundResponse("Not found"));
  } else {
    res.json(MessageResponse("Album deleted"));
  }
});

// Function 19: Delete song in album by id
router.delete("/:albumID/song/:songID", requireRole("user"), async (req, res) => {
  const albumID = parseInt(req.params.albumID);
  const songID = parseInt(req.params.songID);

  const result = await Album_detail.destroy({
    where: {
      albumID: albumID,
      songID: songID,
    },
  });
  if (result === 0) {
    res.json(NotFoundResponse("Not found"));
  } else {
    res.json(MessageResponse("Song deleted"));
  }
}
);

// Function 20: Set privacy of album
router.put("/setPrivacy", requireRole("user"), async (req, res) => {
  const albumID = parseInt(req.body.id);
  const isPrivate = req.body.isPrivate;
  const album = await Album.update(
    { isPrivate: isPrivate },
    {
      where: {
        id: albumID,
      },
    }
  );
  if (album == 0) {
    res.json(NotFoundResponse("Not found"));
  } else {
    res.json(MessageResponse("Album update"));
  }
});

export default router;
