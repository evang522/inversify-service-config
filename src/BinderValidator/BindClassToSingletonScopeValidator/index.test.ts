import BoundServiceReader from '../../BoundServiceReader';
import BindClassToSingletonScopeValidator from './BindClassToSingletonScopeValidator';
import {BindingAction} from "../../BindingAction";
import FileReader from "../../Example/Class/FileReader";

describe('Validate', () =>
{
    it('Prevents Symbol service ID from being bound', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindClassToSingletonScope,
            serviceId: Symbol.for('test symbol'),
        });

        const validator = new BindClassToSingletonScopeValidator(serviceReader);

        expect(() => validator.validateServiceConfig()).toThrow('Cannot bind symbol Service ID to a singleton scope');
    });

    it('Prevents the usage of a constantValueFactory', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindClassToSingletonScope,
            serviceId: FileReader,
            constantValueFactory: (): boolean => true,
        });

        const validator = new BindClassToSingletonScopeValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('Binding Class to Singleton Scope will not use the provided constant value factory');
    });

    it('Prevents the specification of a target class', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindClassToSingletonScope,
            serviceId: FileReader,
            targetClass: FileReader,
        });

        const validator = new BindClassToSingletonScopeValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow(
                'Binding Class to Singleton will not use provided target class -- it will use the service id as Class.'
            );
    });

    it('Permits correct config', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindClassToSingletonScope,
            serviceId: FileReader,
        });

        const validator = new BindClassToSingletonScopeValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .not.toThrow();
    });
});
