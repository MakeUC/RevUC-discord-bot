const { Sequelize, DataTypes } = require(`sequelize`)

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres', dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } })
exports.sequelize = sequelize

exports.User = sequelize.define(`discord-user`, {
  userID: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

exports.Event = sequelize.define(`event`, {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

exports.Claim = sequelize.define('claim',  {
  userID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventCode: {
    type: DataTypes.STRING,
    allowNull: false
  }
})