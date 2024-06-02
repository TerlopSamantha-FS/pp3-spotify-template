module.exports = (sequelize, DataTypes) => {
  const SpotifyToken = sequelize.define('SpotifyToken', {
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_in: {
      type: DataTypes.BIGINT,
      allowNull: false,
    }
  });

  return SpotifyToken;
};
