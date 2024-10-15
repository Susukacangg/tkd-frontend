export const PASS_REGEX: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\/])[A-Za-z\d@$!%*?&\/]{8,}$/;
export const USERNAME_REGEX: RegExp = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9])*$/;
export const CURRENT_USERNAME_KEY = "current_username";
export const JWT_TOKEN_KEY = "token";
export const IS_AUTHENTICATED_KEY = "is_authenticated";
