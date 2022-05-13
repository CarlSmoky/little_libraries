const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyJWT');


module.exports = ({
  getLibraries,
  getLibraryById,
  addLibrary,
  addImageURLToLibrary
}) => {

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    getLibraryById(id)
      .then((library) => {
        res.json(library);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  /* GET users listing. */
  router.get('/', (req, res) => {
    getLibraries()
      .then((libraries) => {
        // console.log(libraries);
        res.json(libraries);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/imageURL', (req, res) => {
    const { id, url } = req.body;

    addImageURLToLibrary(id, url)
      .then(() => {
        res.json({
          message: `updated image url for library ${id}`
        })
      })
      .catch(err => res.json({
        error: err.message
      }))
  });



  router.post('/', verifyJWT, (req, res) => {
    const { address, lat, lng } = req.body;
    console.log("HERE ->", req.user.id);
    addLibrary(address, lat, lng)
      .then((library) => {
        res.json({
          library,
          message: "Yo, u are authenticated Congrats!",
          auth: true,
        });
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};
