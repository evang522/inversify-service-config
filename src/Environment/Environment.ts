import EnvironmentInterface from "./EnvironmentInterface";

export default class Environment<TEnvironment extends string = string> implements EnvironmentInterface{
    public constructor(
        private currentEnvironment: TEnvironment,
    ) {
    }

    public inEnvironment(environmentInQuestion: TEnvironment) : boolean
    {
        return this.currentEnvironment === environmentInQuestion;
    }

    public inAnyOfTheseEnvironments(environmentsInQuestion: TEnvironment[]): boolean
    {
        return environmentsInQuestion.includes(this.currentEnvironment);
    }

    public getEnv(): TEnvironment
    {
        return this.currentEnvironment;
    }
}

