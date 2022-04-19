module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = email => {

    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (firstName, lastName, email, hashedPassword) => {

    const query = {
      text: `INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4) returning id, first_name, last_name, email`,
      values: [firstName, lastName, email, hashedPassword]
    };
    console.log("ADD USER", query);
    return db.query(query)
      .then(result => {
        console.log(result.rows[0]);
        return result.rows[0];
      })
      .catch(err => {
        console.log(err);
        // return err;
      });
  };

  const getUsersPosts = () => {
    const query = {
      text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id`
    };

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);

  };

  // libraries
  const getLibraries = () => {
    const query = {
      text: 'SELECT * FROM libraries',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getLibraryById = id => {
    const query = {
      text: `SELECT * FROM libraries WHERE id = $1`,
      values: [id]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addLibrary = (adress, lat, long) => {
    const query = {
      text: `INSERT INTO libraries (address, lat, long) VALUES($1, $2, $3) returning *`,
      values: [adress, lat, long]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getVisitCountByUser = async (userId, libraryId) => {

    const query = {
      text: `SELECT COUNT(*) FROM visits WHERE user_id = $1 AND library_id = $2`,
      values: [userId, libraryId]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const getVisitCountByLibrary = async (libraryId) => {

    const query = {
      text: `SELECT COUNT(*) FROM visits WHERE library_id = $1`,
      values: [libraryId]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const recordVisit = async (userId, libraryId) => {

    const query = {
      text: `INSERT INTO visits (user_id, library_id) VALUES ($1, $2) returning *`,
      values: [userId, libraryId]
    };

    const dbResult = await db.query(query);
    const [totalCountResult, userCountResult] = await Promise.all([
      getVisitCountByLibrary(libraryId),
      getVisitCountByUser(userId, libraryId)
    ]);

    return {
      count: totalCountResult.count,
      time: dbResult.rows[0].created_at,
      countByUser: userCountResult.count };
  };

  const getCountVisit = async (userId, libraryId) => {

    const [totalCountResult, userCountResult] = await Promise.all([
      getVisitCountByLibrary(libraryId),
      getVisitCountByUser(userId, libraryId)
    ]);

    return {
      count: totalCountResult.count,
      countByUser: userCountResult.count };
  };

  return {
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts,
    getLibraries,
    getLibraryById,
    addLibrary,
    getVisitCountByUser,
    getVisitCountByLibrary,
    recordVisit,
    getCountVisit
  };
};
