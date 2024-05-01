const UserModel = require("../../mongodb/mongo");
// const { GridFSBucket, ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const fs = require('fs');
const upload = require("../../middlewares/upload");
const dbConfig = require("../../config/db");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = dbConfig.url;
const baseUrl = "http://localhost:3001/v1/api/user/files/";
const mongoClient = new MongoClient(url);
const path = require("path");



module.exports = {
  createUser: async (req, res) => {
    // Checking if the Account Already Exists
    const { uid } = req.params;
    const accountAlreadyExists = await UserModel.exists({
      uid,
    });
    if (accountAlreadyExists)
      return res.status(403).json({
        user: null,
        error: { message: "This account has already been created." },
      });

    const { email, username } = req.body;

    // New User
    const min = 1;
    const max = 5;
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    const randNum = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled
    );
    const user = await UserModel.create({
      email,
      username,
      uid,
      profilePicture: randNum,
    });
    res.status(200).json({ user, error: null });
  },
  getUser: async (req, res) => {
    try {
      const { uid } = req.params;

      // Find the user document by UID
      const user = await UserModel.findOne({ uid });

      if (!user) {
        // User not found
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ user, error: null });
    } catch (error) {
      // Error occurred while fetching user information
      console.error("Error fetching user information:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateProfilePicture: async (req, res) => {
    try {
        const uid = req.params.uid;
        const uploadedFile = req.file;

        // Log the uploaded file object to inspect its properties
        console.log("Uploaded file:", uploadedFile);

        // Check if file was uploaded
        if (!uploadedFile) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Check the value of the path property
        console.log("Uploaded file path:", uploadedFile.path);

        // Find the user by userId
        const user = await UserModel.findOne({ uid });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Continue with your code...
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ error: "Internal server error" });
    }
},




  deleteUser: async (req, res) => {
    try {
      const { uid } = req.params;

      // Find the user by uid and delete it
      const user = await UserModel.findOneAndDelete({ uid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  editUsername: async (req, res) => {
    try {
      const { uid } = req.params;
      const newUsername = req.body.username;

      // Find the user by userId
      const user = await UserModel.findOne({ uid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log("Original username:", user.username); // Log original username

      // Update the username
      user.username = newUsername;

      console.log("Updated username (in memory):", user.username); // Log updated username

      // Save the updated user object to the database
      const updatedUser = await user.save();

      console.log("Updated username (after save):", updatedUser.username); // Log saved username

      // Return the updated user object as response
      res.json({ message: "Username updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating username:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  
  uploadFiles: async (req, res) => {
    try {
      await upload(req, res);
      console.log(req.file);
  
      if (req.file == undefined) {
        return res.send({
          message: "You must select a file.",
        });
      }
  
      return res.send({
        message: "File has been uploaded.",
      });
    } catch (error) {
      console.log(error);
  
      return res.send({
        message: "Error when trying upload image: ${error}",
      });
    }
  },

  getListFiles: async (req, res) => {
    try {
      await mongoClient.connect();
  
      const database = mongoClient.db(dbConfig.database);
      const images = database.collection(dbConfig.imgBucket + ".files");
  
      const cursor = images.find({});
  
      if ((await cursor.count()) === 0) {
        return res.status(500).send({
          message: "No files found!",
        });
      }
  
      let fileInfos = [];
      await cursor.forEach((doc) => {
        fileInfos.push({
          name: doc.filename,
          url: baseUrl + doc.filename,
        });
      });
  
      return res.status(200).send(fileInfos);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  },

  download: async (req, res) => {
    try {
      await mongoClient.connect();
  
      const database = mongoClient.db(dbConfig.database);
      const bucket = new GridFSBucket(database, {
        bucketName: dbConfig.imgBucket,
      });
  
      const downloadStream = bucket.openDownloadStreamByName(req.params.name);
  
      downloadStream.on("data", function (data) {
        return res.status(200).write(data);
      });
  
      downloadStream.on("error", function (err) {
        return res.status(404).send({ message: "Cannot download the Image!" });
      });
  
      downloadStream.on("end", () => {
        return res.end();
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  },

  getHome: (req, res) => {
    return res.sendFile(path.join(`${__dirname}/../../../../../client/src/components/pages/Settings/ImageFileInputPopup.js`));
  },

};
