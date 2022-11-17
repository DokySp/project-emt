var DataTypes = require("sequelize").DataTypes;
var _classes = require("./classes");
var _classes_file_link = require("./classes_file_link");
var _course = require("./course");
var _course_user_link = require("./course_user_link");
var _division = require("./division");
var _file = require("./file");
var _subjects = require("./subjects");
var _subjects_file_link = require("./subjects_file_link");
var _submit = require("./submit");
var _submit_file_link = require("./submit_file_link");
var _user = require("./user");
var _user_division_link = require("./user_division_link");

function initModels(sequelize) {
  var classes = _classes(sequelize, DataTypes);
  var classes_file_link = _classes_file_link(sequelize, DataTypes);
  var course = _course(sequelize, DataTypes);
  var course_user_link = _course_user_link(sequelize, DataTypes);
  var division = _division(sequelize, DataTypes);
  var file = _file(sequelize, DataTypes);
  var subjects = _subjects(sequelize, DataTypes);
  var subjects_file_link = _subjects_file_link(sequelize, DataTypes);
  var submit = _submit(sequelize, DataTypes);
  var submit_file_link = _submit_file_link(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_division_link = _user_division_link(sequelize, DataTypes);

  classes.belongsToMany(file, { as: 'file_idx_files', through: classes_file_link, foreignKey: "classes_idx", otherKey: "file_idx" });
  course.belongsToMany(user, { as: 'user_idx_users', through: course_user_link, foreignKey: "course_idx", otherKey: "user_idx" });
  division.belongsToMany(user, { as: 'user_idx_user_user_division_links', through: user_division_link, foreignKey: "division_idx", otherKey: "user_idx" });
  file.belongsToMany(classes, { as: 'classes_idx_classes', through: classes_file_link, foreignKey: "file_idx", otherKey: "classes_idx" });
  file.belongsToMany(subjects, { as: 'subjects_idx_subjects', through: subjects_file_link, foreignKey: "file_idx", otherKey: "subjects_idx" });
  file.belongsToMany(submit, { as: 'submit_idx_submits', through: submit_file_link, foreignKey: "file_idx", otherKey: "submit_idx" });
  subjects.belongsToMany(file, { as: 'file_idx_file_subjects_file_links', through: subjects_file_link, foreignKey: "subjects_idx", otherKey: "file_idx" });
  submit.belongsToMany(file, { as: 'file_idx_file_submit_file_links', through: submit_file_link, foreignKey: "submit_idx", otherKey: "file_idx" });
  user.belongsToMany(course, { as: 'course_idx_courses', through: course_user_link, foreignKey: "user_idx", otherKey: "course_idx" });
  user.belongsToMany(division, { as: 'division_idx_divisions', through: user_division_link, foreignKey: "user_idx", otherKey: "division_idx" });
  classes_file_link.belongsTo(classes, { as: "classes_idx_class", foreignKey: "classes_idx"});
  classes.hasMany(classes_file_link, { as: "classes_file_links", foreignKey: "classes_idx"});
  classes.belongsTo(course, { as: "course_idx_course", foreignKey: "course_idx"});
  course.hasMany(classes, { as: "classes", foreignKey: "course_idx"});
  course_user_link.belongsTo(course, { as: "course_idx_course", foreignKey: "course_idx"});
  course.hasMany(course_user_link, { as: "course_user_links", foreignKey: "course_idx"});
  subjects.belongsTo(course, { as: "course_idx_course", foreignKey: "course_idx"});
  course.hasMany(subjects, { as: "subjects", foreignKey: "course_idx"});
  user_division_link.belongsTo(division, { as: "division_idx_division", foreignKey: "division_idx"});
  division.hasMany(user_division_link, { as: "user_division_links", foreignKey: "division_idx"});
  classes_file_link.belongsTo(file, { as: "file_idx_file", foreignKey: "file_idx"});
  file.hasMany(classes_file_link, { as: "classes_file_links", foreignKey: "file_idx"});
  subjects_file_link.belongsTo(file, { as: "file_idx_file", foreignKey: "file_idx"});
  file.hasMany(subjects_file_link, { as: "subjects_file_links", foreignKey: "file_idx"});
  submit_file_link.belongsTo(file, { as: "file_idx_file", foreignKey: "file_idx"});
  file.hasMany(submit_file_link, { as: "submit_file_links", foreignKey: "file_idx"});
  subjects_file_link.belongsTo(subjects, { as: "subjects_idx_subject", foreignKey: "subjects_idx"});
  subjects.hasMany(subjects_file_link, { as: "subjects_file_links", foreignKey: "subjects_idx"});
  submit.belongsTo(subjects, { as: "subjects_idx_subject", foreignKey: "subjects_idx"});
  subjects.hasMany(submit, { as: "submits", foreignKey: "subjects_idx"});
  submit_file_link.belongsTo(submit, { as: "submit_idx_submit", foreignKey: "submit_idx"});
  submit.hasMany(submit_file_link, { as: "submit_file_links", foreignKey: "submit_idx"});
  course_user_link.belongsTo(user, { as: "user_idx_user", foreignKey: "user_idx"});
  user.hasMany(course_user_link, { as: "course_user_links", foreignKey: "user_idx"});
  submit.belongsTo(user, { as: "user_idx_user", foreignKey: "user_idx"});
  user.hasMany(submit, { as: "submits", foreignKey: "user_idx"});
  user_division_link.belongsTo(user, { as: "user_idx_user", foreignKey: "user_idx"});
  user.hasMany(user_division_link, { as: "user_division_links", foreignKey: "user_idx"});

  return {
    classes,
    classes_file_link,
    course,
    course_user_link,
    division,
    file,
    subjects,
    subjects_file_link,
    submit,
    submit_file_link,
    user,
    user_division_link,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
