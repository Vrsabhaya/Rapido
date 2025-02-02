import { supabase, handleSupabaseError } from '../config/supabase';

const API_BASE_URL = 'https://us-central1-rapido-on-demand.cloudfunctions.net/api';

const getAuthHeaders = async () => {
  const token = await supabase.auth.user()?.getIdToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Bookings API
export const createBooking = async (bookingData) => {
  try {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        ...bookingData,
        user_id: user.id,
        created_at: new Date(),
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    // Create notification for admin
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert([{
        user_id: 'admin',
        type: 'new_booking',
        booking_id: data.id,
        message: `New booking received from ${user.email}`,
        created_at: new Date(),
        read: false
      }]);

    if (notificationError) throw notificationError;

    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};

export const getBookings = async () => {
  try {
    const user = supabase.auth.user();
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    const isAdmin = userRoles?.role === 'admin';

    let query = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!isAdmin) {
      query = query.eq('user_id', user.id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};

// Services API
export const createService = async (serviceData) => {
  try {
    const user = supabase.auth.user();
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (userRoles?.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase
      .from('services')
      .insert([{
        ...serviceData,
        created_at: new Date()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};

export const getServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};

// Staff API
export const createStaffMember = async (staffData) => {
  try {
    const user = supabase.auth.user();
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (userRoles?.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase
      .from('staff')
      .insert([{
        ...staffData,
        created_at: new Date()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};

export const getStaffMembers = async () => {
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};

// User Profiles API
export const createUserProfile = async (profileData) => {
  try {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('profiles')
      .upsert([{
        id: user.id,
        ...profileData,
        updated_at: new Date()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};

export const getUserProfile = async (userId) => {
  try {
    const user = supabase.auth.user();
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (userId !== user.id && userRoles?.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Profile not found');

    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}; 