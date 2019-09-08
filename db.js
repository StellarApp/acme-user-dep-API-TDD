const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/api_db"
);
const { UUID, UUIDV4, STRING } = Sequelize;
const faker = require("faker");
const idDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
};

const nameDef = {
  type: STRING,
  notEmpty: true,
  unique: true,
  allowNull: false
};

const User = conn.define("user", {
  id: idDef,
  name: nameDef
});

const Department = conn.define("department", {
  id: idDef,
  name: nameDef
});

User.belongsTo(Department);
Department.hasMany(User);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const departments = [
    { name: "Admin" },
    { name: "Accounting" },
    { name: "Marketing" }
  ];
  const deps = await Promise.all(
    departments.map(dep => Department.create(dep))
  );

  const users = new Array(3).fill().map((item, i) => {
    return { name: faker.name.firstName(), departmentId: deps[i].id };
  });
  
  const _users = await Promise.all(users.map(user => User.create(user)));
};
// syncAndSeed();

module.exports = {
  syncAndSeed,
  models: {
    User,
    Department
  }
};
