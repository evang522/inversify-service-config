/**
 * @description As this is just an interface, you can  build this service however you want.
 * The primary responsibility is for it to be aware of the current ENV. If you don't want to build
 * the service yourself, you can simply use the `Environment` class.
 */
export default interface EnvironmentInterface<TEnvironment extends string = string> {
    /**
     * @description Provide an environment and the service will return true if it is in this environment.
     * @example  inEnvironment('prod') // returns "true"  if currently in production  "false" if in development.
     */
    inEnvironment(environmentInQuestion: TEnvironment) : boolean;

    /**
     * @description Provide a list of environments and the service should return true
     * if the current environment is one of them.
     * @example  `inAnyOfTheseEnvironments(['test', 'dev'])` // will return true if currently in dev environment.
     */
    inAnyOfTheseEnvironments(environmentsInQuestion: TEnvironment[]): boolean

    /**
     * @description Get the current environment.
     */
    getEnv(): TEnvironment;
}

