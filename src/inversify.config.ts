import { Container } from "inversify";
import {
  IMessageCodeService,
  MessageCodeService,
} from "./services/MessageCodeService";
import { useInversify as useCommonServiceInversify } from "@lst97/common-services";
import { DefinedBaseError } from "./models/Errors";
/**
 * For the user to get the singleton instance of the services,
 * Support to use the provided container to build the services.
 * If not provided, it will create a new container for the services.
 * It makes use it use the singleton instance of the services.
 *
 */
export class Containers {
  private static _instance: Containers;
  private container: Container;

  private constructor() {
    this.container = new Container();
    this.buildContainers();
  }

  public static get instance() {
    if (!Containers._instance) {
      Containers._instance = new Containers();
    }
    return Containers._instance;
  }

  public get inversifyContainer() {
    return this.container;
  }

  private buildLibContainer() {
    useCommonServiceInversify(this.container);
  }

  private buildContainers() {
    this.buildConstantsContainer();
    this.buildLibContainer();
    this.buildServiceContainer();
  }

  // Arguments that required for the services
  private buildConstantsContainer() {
    // TODO: user can provide the values
    // path to the message codes json file
    if (!this.container.isBound("MessageCodesJsonPath")) {
      this.container
        .bind<string>("MessageCodesJsonPath")
        .toConstantValue("src/models/MessageCodes.json");
    }
  }
  private buildServiceContainer() {
    if (!this.container.isBound(MessageCodeService)) {
      this.container.bind<IMessageCodeService>(MessageCodeService).toSelf();
    }
  }

  public useInversify(container: Container) {
    // use the user provided container to build the middleware containers
    this.container = container;
    this.buildContainers();
  }
}

/**
 * For the user to inject the services into the application.
 *
 * @param container - The user provided container.
 *
 * @example
 * ```typescript
 * import { useInversify } from '@lst97/common_response';
  const container = new Container();
  function buildLibContainers() {
    useInversify(container);
  }
 * ```
 */
export const useInversify = (container: Container) => {
  Containers.instance.useInversify(container);
};

/**
 * For internal use only.
 * @returns the singleton instance of the container
 */
export const inversifyContainer = () => {
  return Containers.instance.inversifyContainer;
};
