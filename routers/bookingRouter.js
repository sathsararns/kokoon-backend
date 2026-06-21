import express from "express";
import {
  createBooking,
  getProviderBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

// customer creates booking
router.post("/", createBooking);

// provider sees bookings
router.get("/", getProviderBookings);

// provider updates booking status
router.put("/:id", updateBookingStatus);

export default router;