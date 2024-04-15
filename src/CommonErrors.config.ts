export class Config {
  private static _instance: Config;
  // For DefinedBaseError to construct the traceId and requestId
  // example: "{_idIdentifier}.{_traceIdName}.uuidv4"
  private _idIdentifier: string = "@lst97/common-errors";
  private _requestIdName: string = "requestId";
  private _traceIdName: string = "traceId";
  private _messageCodeDefinitionsFilePath: string =
    "src/models/MessageCodes.json";

  private constructor() {}

  public static get instance() {
    if (!Config._instance) {
      Config._instance = new Config();
    }
    return Config._instance;
  }

  public set idIdentifier(value: string) {
    this._idIdentifier = value;
  }

  public get idIdentifier() {
    return this._idIdentifier;
  }

  public set requestIdName(value: string) {
    this._requestIdName = value;
  }

  public get requestIdName() {
    return this._requestIdName;
  }

  public set traceIdName(value: string) {
    this._traceIdName = value;
  }

  public get traceIdName() {
    return this._traceIdName;
  }

  public set messageCodeDefinitionsFilePath(value: string) {
    this._messageCodeDefinitionsFilePath = value;
  }

  public get messageCodeDefinitionsFilePath() {
    return this._messageCodeDefinitionsFilePath;
  }
}
