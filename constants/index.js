export const GROUP_PERMISSIONS = {
  READ: 'READ',
  WRITE: 'WRITE',
  DELETE: 'DELETE',
  SHARE: 'SHARE',
  UPLOAD_FILES: 'UPLOAD_FILES'
};

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  DELETED: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500
};

export const USERS = [
  {
    username: 'admin',
    password: 'admin',
    role: 'admin'
  }, {
    username: 'user',
    password: 'user',
    role: 'member'
  }
];
