export enum BindingAction
{
    /**
     * @description This will take multiple service Ids (service ID symbols or classes and bind them to a constant value)
     * For example, binding the Event Bus Class and the Event Bus Interface to the same instance
     */
    BindMultipleServiceIdsToConstantValue = 'BindMultipleServiceIdsToConstantValue',
    /**
     * @description Takes a class and binds it to itself as a singleton
     * This means that whenever you request the class from the container, it will always return the same instance.
     * Avoid this if your service has state and repeated use in different contexts, unless intended.
     */
    BindClassToSingletonScope = 'BindClassToSingletonScope',
    /**
     * @description Binds a service Id (either an interface ID or a class) to
     * the return value of a factory provided to the configuration.
     * It will be used as a constant value and will not re-create it on each request from the container.
     */
    BindServiceIdToConstantValue = 'BindServiceIdToConstantValue',
    /**
     * @description Binds an interface ID to a concrete class. The most commonly used configuration.
     */
    BindServiceIdToClass = 'BindServiceIdToClass',
    /**
     * @description Binds an Interface ID to a concrete class in a singleton Scope.
     * This means it will not be re-created on each request.
     */
    BindServiceIdToClassInSingletonScope = 'BindServiceIdToClassInSingletonScope',
}
