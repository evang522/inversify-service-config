export default class Environment<TEnvironment extends string = string> {
    public constructor(
        private currentEnvironment: TEnvironment,
    ) {
    }

    public inEnvironment(environmentInQuestion: TEnvironment) : boolean
    {
        return this.currentEnvironment === environmentInQuestion;
    }

    public inAnyEnvironment(environmentsInQuestion: TEnvironment[]): boolean
    {
        return environmentsInQuestion.includes(this.currentEnvironment);
    }

    public getEnv(): TEnvironment
    {
        return this.currentEnvironment;
    }
}


const environment = new Environment<"dev"|"prod">('dev');

environment.inAnyEnvironment(['dev', 'prod']);
