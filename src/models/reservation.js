const { client } = require('../db/libsql');

const reservationModel = {
    // Verificar si ya existe una reserva de evento para la fecha
    checkEventReservation: async (date) => {
        const result = await client.execute({
            sql: "SELECT 1 FROM reservations WHERE reservationDate = ? AND reservationType = 'Evento'",
            args: [date],
        });
        return result.rows.length > 0;
    },

    // Verificar si ya existe una reserva de mesa para la fecha y hora
    checkTableReservation: async (date, time) => {
        const result = await client.execute({
            sql: "SELECT 1 FROM reservations WHERE reservationDate = ? AND reservationTime = ? AND reservationType = 'Mesa'",
            args: [date, time],
        });
        return result.rows.length > 0;
    },

    // Crear una nueva reserva
    create: async (reservation) => {
        const { reservationType, fullName, numPeople, reservationDate, reservationTime, eventDetails } = reservation;

        const result = await client.execute({
            sql: 'INSERT INTO reservations (reservationType, fullName, numPeople, reservationDate, reservationTime, eventDetails) VALUES (?, ?, ?, ?, ?, ?)',
            args: [reservationType, fullName, Number(numPeople), reservationDate, reservationTime, eventDetails],
        });
        const id = Number(result.lastInsertRowid);

        const created = await reservationModel.getById(id);
        return created;
    },

    // Obtener una reserva por ID
    getById: async (id) => {
        const result = await client.execute({
            sql: 'SELECT id, reservationType, fullName, numPeople, reservationDate, reservationTime, eventDetails FROM reservations WHERE id = ?',
            args: [parseInt(id)],
        });
        return result.rows[0] || null;
    },

    // Obtener todas las reservas (para la app, quizás solo las futuras)
    getAll: async () => {
        const result = await client.execute('SELECT id, reservationType, fullName, numPeople, reservationDate, reservationTime, eventDetails FROM reservations ORDER BY reservationDate DESC, reservationTime DESC');
        return result.rows;
    }
};

module.exports = reservationModel;