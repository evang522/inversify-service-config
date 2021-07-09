import BoundServiceReader from '../../BoundServiceReader';
import BindMultipleServiceIdsToConstantValueValidator from './BindMultipleServiceIdsToConstantValueValidator';
import EndpointConstructor from '../../../../EndpointConstructor';
import ServiceId from '../../../../../../application/_config/ServiceId';

describe('Validate', () =>
{
    it('Enforces that config contains multiple services', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindMultipleServiceIdsToConstantValue',
            serviceId: Symbol.for('test symbol'),
        });

        const validator = new BindMultipleServiceIdsToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig()).toThrow('Only a single service ID passed');
    });

    it('Prevents the specification of a target class', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindMultipleServiceIdsToConstantValue',
            serviceId: [
                EndpointConstructor,
                ServiceId.EndpointConstructorInterface,
            ],
            targetClass: EndpointConstructor,
        });

        const validator = new BindMultipleServiceIdsToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig()).toThrow('Specifying a target class is not valid');
    });

    it('Permits correct config', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindMultipleServiceIdsToConstantValue',
            serviceId: [
                EndpointConstructor,
                ServiceId.EndpointConstructorInterface,
            ],
        });

        const validator = new BindMultipleServiceIdsToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .not.toThrow();
    });
});
