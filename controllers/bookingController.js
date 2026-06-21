import Booking from "../models/Booking.js";

// CREATE BOOKING
export async function createBooking(req, res) {
  try {
    const booking = new Booking({
      customerId: req.user.id, // from JWT
      providerId: req.body.providerId,
      serviceName: req.body.serviceName,
      description: req.body.description,
      date: req.body.date,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET CUSTOMER BOOKINGS
export async function getCustomerBookings(req, res) {
  try {
    const bookings = await Booking.find({
      customerId: req.user.id,
    }).populate("providerId");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET PROVIDER BOOKINGS
export async function getProviderBookings(req, res) {
  try {
    const bookings = await Booking.find({
      providerId: req.user.id,
    }).populate("customerId");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}