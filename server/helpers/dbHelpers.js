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

  const addUser = (firstName, lastName, phoneNumber, email, hashedPassword) => {
    const query = {
      text: `INSERT INTO users(first_name, last_name, phone_number, email, password) VALUES($1, $2, $3, $4, $5) returning id, first_name, last_name, phone_number, email`,
      values: [firstName, lastName, phoneNumber, email, hashedPassword]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
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

  return {
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts,
    getLibraries
  };
};
