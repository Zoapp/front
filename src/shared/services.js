import { WebService, AuthService, SocketService } from "zoapp-common";
import defaultConfig from "./config";

let authService;

let webService;

export function initServices(config = defaultConfig) {
  const { backend } = config;
  let authUrl = "/auth/"; // defaults to relative, same port.

  if (backend.auth && backend.auth.url) {
    authUrl = backend.auth.url;
  }

  const authConfig = {
    clientId: backend.auth.clientId,
    clientSecret: backend.auth.clientSecret,
    url: authUrl,
  };

  let apiUrl = "/api/v1/"; // defaults to relative, same port.

  if (backend.api && backend.api.url) {
    apiUrl = backend.api.url;
  }

  const apiConfig = {
    url: apiUrl,
  };

  authService = new AuthService(authConfig);
  webService = new WebService(apiConfig, authService);
}

export function createSocketService(path) {
  const url = webService.buildWsUrl(path);
  const socketService = new SocketService(url);
  return socketService;
}

export function getAuthService(provider) {
  let service = authService;
  if (provider) {
    service = new AuthService({ provider });
  }
  return service;
}

export function getWebService() {
  return webService;
}
