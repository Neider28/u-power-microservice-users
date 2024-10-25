export enum RabbitMQ {
  UserQueue = 'users',
  AuthQueue = 'auth',
}

export enum AuthMSG {
  LOGIN_GOOGLE = 'LOGIN_GOOGLE',
  PROFILE = 'PROFILE',
}

export enum UserMSG {
  UPDATE = 'UPDATE_USER',
  FIND_STUDENTS = 'FIND_STUDENTS',
}
