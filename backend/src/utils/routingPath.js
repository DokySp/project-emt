module.exports = {
  apiPrefix: { url: `/api` },
  //
  apiCoursePrefix: {
    url: `/course`,
    route: "./src/routes/course.route",
  },

  apiClassesPrefix: {
    url: `/classes`,
    route: "./src/routes/classes.route",
  },

  apiSubjectsPrefix: {
    url: `/subjects`,
    route: "./src/routes/subjects.route",
  },

  apiDivisionPrefix: {
    url: `/division`,
    route: "./src/routes/division.route",
  },

  // apiUserPrefix: {
  //   url: `/user`,
  //   route: "./src/routes/user.route",
  // },

  // apiFilePrefix: {
  //   url: `/file`,
  //   route: "./src/routes/file.route",
  // },
};
