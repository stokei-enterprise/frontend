export interface DeviceData {
  readonly type: string;
  readonly version: string;
  readonly system: string;
  readonly name: string;
  readonly language: string;
  readonly browser?: string;
  readonly browserVersion?: string;
}

export const currentDevice = (): DeviceData => {
  /* const client = new ClientJS();
    return ({
        browser: client.getBrowser(),
        browserVersion: client.getBrowserMajorVersion(),
        version: client.getOSVersion(),
        system: client.getOS(),
        type: client.getDeviceType() || "pc",
        language: client.getLanguage(),
        name: client.getDevice() || "pc",
    }); */
  return null;
};
