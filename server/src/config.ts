export default {
  auth: {
    key: process.env.AUTH_KEY || 'baemin-key',
  },
  db: {
    url: process.env.MYSQL_URL || 'mysql://root:mysql@localhost:3306/baemin',
  },
};
