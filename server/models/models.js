const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id_user:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
    },
    password:{
      type: DataTypes.STRING,
    },
    id_role:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
},
  {
    tableName: 'user',
    timestamps: false,
  }
);
const Role = sequelize.define('role', {
  id_role:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type: DataTypes.STRING,
    unique: true,
  }
},
  {
    tableName: 'role',
    timestamps: false,
  }
);
const Catalog = sequelize.define('catalog', {
  id_catalog:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type: DataTypes.STRING,
    unique: true,
  },
},
  {
    tableName: 'catalog',
    timestamps: false,
  }
);
const Order = sequelize.define('order', {
  id_order:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone:{
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  address:{
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    unique: true,
  },
  nameOrder:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  priceOrder: {
    type: DataTypes.FLOAT(10),
    allowNull: false,
  },
  statusOrder:{
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  
},
  {
    tableName: 'order',
    timestamps: false,
  }
);
const Character = sequelize.define('character', {
  id_character: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  descript:{
    type: DataTypes.STRING(1500),
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT(10),
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  id_catalog:{
    type: DataTypes.INTEGER,
    allowNull: false,  
  },
}, 
  {
    tableName: 'character',
    timestamps: false,
  }
);

User.belongsTo(Role, { foreignKey: 'id_role', targetKey: 'id_role' });
Character.belongsTo(Catalog, { foreignKey: 'id_catalog', targetKey: 'id_catalog' });

module.exports = {
  Catalog,
  Character,
  User,
  Role,
  Order
};