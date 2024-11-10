import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import hashPassword  from '../utils/hashHook';

class User extends Model {
  public disabled?: boolean;
  public username?: string;
  public id?: number;
  public name?: string;
  public password?: string;
  public role!: 'admin' | 'user' | 'superuser'; 
  public avatar_url: string  | undefined;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg : "Validation isEmail on username failed"
      },   
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100],  // Minimum length requirement
      isStrongPassword(value : string) {
        if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value) || !/[@$!%*?&#]/.test(value)) {
          throw new Error('Password must contain uppercase, lowercase, number, and special character');
        }
      }
    }
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }, 
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role: {
    type : DataTypes.ENUM({ values: ['user', 'superuser', 'admin']}),
  },
  avatar_url: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user',
  defaultScope: {
    attributes: { exclude: ['password' , 'role'] },
  },
  scopes: {
    sensitive: {
      attributes: { include: ['password' , 'role'] } 
    }
  }
});

// Password hashing hook
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await hashPassword(user.password);
  }
});

User.beforeUpdate(async (user: any ) => {
  if (user.changed('password')) {
    user.password = await hashPassword(user.password);
  }
});

export default User;