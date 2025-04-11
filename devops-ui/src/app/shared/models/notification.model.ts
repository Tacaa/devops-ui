export interface Notification {
  id: number | null;
  receiverId: number | null;
  senderId: number | null;
  title: string;
  content: string;
  notificationType: NotificationType;
  read: boolean;
  createdAt: Date;
}

export enum NotificationType {
  RESERVATION_REQUEST = 'RESERVATION_REQUEST',
  RESERVATION_CANCELATION = 'RESERVATION_CANCELATION',
  HOST_REVIEW = 'HOST_REVIEW',
  ACCOMMODATION_REVIEW = 'ACCOMMODATION_REVIEW',
  HOST_RESPONSE = 'HOST_RESPONSE',
}
