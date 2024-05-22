module.exports = (sequelize, DataTypes) => {
    const SpotifyToken = sequelize.define('SpotifyToken', {
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresIn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    return SpotifyToken;
  };
  