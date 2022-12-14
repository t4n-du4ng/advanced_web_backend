module.exports = (Sequelize, DataTypes) => {
    const User_Choice = Sequelize.define(
        'User_Choice',
        {
            guest_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            choice_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'user_choice',
        }
    )

    User_Choice.associate = (models) => {
        // // Associate User(1) - User_Choice(*)
        // User_Choice.belongsTo(models.User, {
        //     foreignKey: 'user_id',
        //     as: 'user',
        // })
        // Associate Choice(1) - User_Choice(*)
        User_Choice.belongsTo(models.Choice, {
            foreignKey: 'choice_id',
            as: 'choice',
        })
    }

    return User_Choice
}
