export interface NotificationsPreferences {
  id: number;
  userId: number;
  guest: boolean;
  reservationRequestEnabled: boolean;
  reservationCancelationEnabled: boolean;
  hostReviewEnabled: boolean;
  accommodationReviewEnabled: boolean;
  hostResponseEnabled: boolean;
}
