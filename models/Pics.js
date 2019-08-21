module.exports = function (sequelize, DataTypes) {
    var Pic = sequelize.define("Pic", {
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
return Pic
 }