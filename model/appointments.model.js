module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("appointments", {
        timeSlot: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Refers to the users table
                key: 'id',
            },
        },
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Refers to the same users table
                key: 'id',
            },
        },
    });

    return Appointments;
};
