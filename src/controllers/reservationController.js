const reservationModel = require('../models/reservation');

const reservationController = {
    // Crear una nueva reserva con validación de disponibilidad
    createReservation: async (req, res) => {
        try {
            const { reservationType, fullName, numPeople, reservationDate, reservationTime, eventDetails } = req.body;

            // Validación de campos obligatorios
            if (!reservationType || !fullName || !numPeople || !reservationDate || !reservationTime) {
                return res.status(400).json({ success: false, message: 'Faltan campos obligatorios.' });
            }

            // --- Lógica de Disponibilidad ---

            if (reservationType === 'Evento') {
                const isEventBooked = await reservationModel.checkEventReservation(reservationDate);
                if (isEventBooked) {
                    return res.status(409).json({ success: false, message: 'Ya existe un evento reservado para esta fecha.' });
                }
            } else if (reservationType === 'Mesa') {
                const isTableBooked = await reservationModel.checkTableReservation(reservationDate, reservationTime);
                if (isTableBooked) {
                    return res.status(409).json({ success: false, message: 'Ya existe una reserva de mesa para esta fecha y hora.' });
                }
            }

            const newReservation = await reservationModel.create({
                reservationType,
                fullName,
                numPeople,
                reservationDate,
                reservationTime,
                eventDetails: reservationType === 'Evento' ? eventDetails : null,
            });

            return res.status(201).json({ success: true, data: newReservation, message: 'Reserva creada correctamente.' });

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error al crear la reserva', error: error.message });
        }
    },

    // Obtener todas las reservas
    getAllReservations: async (req, res) => {
        try {
            const reservations = await reservationModel.getAll();
            return res.status(200).json({ success: true, data: reservations, message: 'Reservas obtenidas correctamente.' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error al obtener las reservas', error: error.message });
        }
    }
};

module.exports = reservationController;