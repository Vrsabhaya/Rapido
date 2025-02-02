const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const { authenticateUser, requireAdmin } = require('./middleware/auth');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(authenticateUser); // Apply authentication middleware to all routes

// Bookings API
app.post('/bookings', async (req, res) => {
  try {
    const booking = {
      ...req.body,
      userId: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending'
    };
    const bookingRef = await admin.firestore().collection('bookings').add(booking);
    
    // Send notification to admin
    const adminNotification = {
      userId: 'admin',
      type: 'new_booking',
      bookingId: bookingRef.id,
      message: `New booking received from ${req.user.email}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false
    };
    await admin.firestore().collection('notifications').add(adminNotification);
    
    res.status(201).json({ id: bookingRef.id, ...booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    let query = admin.firestore().collection('bookings');
    
    // If not admin, only show user's bookings
    if (!req.user.admin) {
      query = query.where('userId', '==', req.user.uid);
    }
    
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    const bookings = [];
    snapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Services API
app.post('/services', requireAdmin, async (req, res) => {
  try {
    const service = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const serviceRef = await admin.firestore().collection('services').add(service);
    res.status(201).json({ id: serviceRef.id, ...service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/services', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('services')
      .orderBy('createdAt', 'desc').get();
    const services = [];
    snapshot.forEach(doc => {
      services.push({ id: doc.id, ...doc.data() });
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Staff API
app.post('/staff', requireAdmin, async (req, res) => {
  try {
    const staff = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const staffRef = await admin.firestore().collection('staff').add(staff);
    res.status(201).json({ id: staffRef.id, ...staff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/staff', requireAdmin, async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('staff')
      .orderBy('createdAt', 'desc').get();
    const staff = [];
    snapshot.forEach(doc => {
      staff.push({ id: doc.id, ...doc.data() });
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Profiles API
app.post('/profiles', async (req, res) => {
  try {
    const { uid } = req.user;
    const profile = {
      ...req.body,
      userId: uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await admin.firestore().collection('profiles').doc(uid).set(profile);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/profiles/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    // Only allow users to access their own profile unless they're admin
    if (uid !== req.user.uid && !req.user.admin) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const doc = await admin.firestore().collection('profiles').doc(uid).get();
    if (!doc.exists) {
      res.status(404).json({ error: 'Profile not found' });
    } else {
      res.json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notifications API
app.get('/notifications', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('notifications')
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
      
    const notifications = [];
    snapshot.forEach(doc => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/notifications/mark-read', async (req, res) => {
  try {
    const { notificationIds } = req.body;
    const batch = admin.firestore().batch();
    
    notificationIds.forEach(id => {
      const notificationRef = admin.firestore().collection('notifications').doc(id);
      batch.update(notificationRef, { read: true });
    });
    
    await batch.commit();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analytics API (Admin only)
app.get('/analytics', requireAdmin, async (req, res) => {
  try {
    const [bookings, services, staff] = await Promise.all([
      admin.firestore().collection('bookings').get(),
      admin.firestore().collection('services').get(),
      admin.firestore().collection('staff').get()
    ]);

    const analytics = {
      totalBookings: bookings.size,
      totalServices: services.size,
      totalStaff: staff.size,
      bookingsByStatus: {},
      recentBookings: []
    };

    bookings.forEach(doc => {
      const booking = doc.data();
      // Count bookings by status
      analytics.bookingsByStatus[booking.status] = 
        (analytics.bookingsByStatus[booking.status] || 0) + 1;
      
      // Add to recent bookings if within last 7 days
      if (booking.createdAt && 
          booking.createdAt.toDate() > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
        analytics.recentBookings.push({
          id: doc.id,
          ...booking
        });
      }
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.api = functions.https.onRequest(app);

// Trigger function for new bookings
exports.onNewBooking = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const booking = snap.data();
    
    // Create notification for admin
    const adminNotification = {
      userId: 'admin',
      type: 'new_booking',
      bookingId: context.params.bookingId,
      message: `New booking received for ${booking.serviceName}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false
    };
    
    await admin.firestore().collection('notifications').add(adminNotification);
  });

// Trigger function for booking status updates
exports.onBookingUpdate = functions.firestore
  .document('bookings/{bookingId}')
  .onUpdate(async (change, context) => {
    const newBooking = change.after.data();
    const previousBooking = change.before.data();
    
    if (newBooking.status !== previousBooking.status) {
      // Create notification for user
      const userNotification = {
        userId: newBooking.userId,
        type: 'booking_status_update',
        bookingId: context.params.bookingId,
        message: `Your booking status has been updated to ${newBooking.status}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        read: false
      };
      
      await admin.firestore().collection('notifications').add(userNotification);
    }
  }); 