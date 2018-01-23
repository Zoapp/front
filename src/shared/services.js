import { WebService, AuthService, SocketService } from "zoapp-common";

let authService;

let webService;

export function initServices(config) {
  const { backend } = config;

  let { host, port, path } = backend.auth;
  if (!host) {
    ({ host } = backend.api);
  }
  if (!port) {
    ({ port } = backend.api);
  }
  // TODO remove url from config
  let p = port ? `:${port}` : "";
  let url = `${host}${p}/${path}`;

  const authConfig = {
    clientId: backend.auth.clientId,
    clientSecret: backend.auth.clientSecret,
    url,
    host,
    port,
    path,
    secure: backend.secure,
  };

  ({ host, port, path } = backend.api);
  // TODO remove url from config
  p = port ? `:${port}` : "";
  url = `${host}${p}/${path}`;
  const apiConfig = {
    url,
    host,
    port,
    path,
    secure: backend.secure,
  };

  authService = new AuthService(authConfig);
  webService = new WebService(apiConfig, authService);
}

export function createSocketService(path) {
  const url = webService.buildUrl(path, "ws");
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
