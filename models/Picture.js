module.exports = function (sequelize, DataTypes) {
    var Picture = sequelize.define("Picture", {
        pictureLink: {
            type: DataTypes.STRING
        },
        picName: {
            type: DataTypes.STRING

        },
        picColor: {
            type: DataTypes.STRING
        }
    }, {
            freezeTableName: true
        });
return Picture
 }