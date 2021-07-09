import BoundServiceReader from '../../BoundServiceReader';
import EndpointConstructor from '../../../../EndpointConstructor';
import BindServiceIdToConstantValueValidator from './BindServiceIdToConstantValueValidator';
import ServiceId from '../../../../../../application/_config/ServiceId';

describe('Validate', () =>
{
    it('Prevents Specification of Target class', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToConstantValue',
            serviceId: EndpointConstructor,
            targetClass: EndpointConstructor,
            constantValueFactory: (): boolean => true,
        });

        const validator = new BindServiceIdToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('Binding a constant value will not use the provided targetClass');
    });

    it('Enforces the provision of a constant value factory', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToConstantValue',
            serviceId: EndpointConstructor,
            targetClass: EndpointConstructor,
        });

        const validator = new BindServiceIdToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('A constant value factory must be provided to bind to constant value');
    });

    it('Permits correct config', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToConstantValue',
            serviceId: ServiceId.EndpointConstructorInterface,
            constantValueFactory: (): boolean => true,
        });

        const validator = new BindServiceIdToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .not.toThrow();
    });
});
