import BoundServiceReader from '../../BoundServiceReader';
import EndpointConstructor from '../../../../EndpointConstructor';
import GenericValidator from './GenericValidator';

describe('validate', () =>
{
    it('Permits generally valid config passing through', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToConstantValue',
            serviceId: EndpointConstructor,
            targetClass: EndpointConstructor,
        });

        const validator = new GenericValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .not.toThrow();
    });

    // The Following tests are primarily for the Abstract Validator
    it('Does not permit invalid environment config', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            environments: [ 'production' ],
            bindingAction: 'BindServiceIdToConstantValue',
            serviceId: EndpointConstructor,
            targetClass: EndpointConstructor,
        });

        const validator = new GenericValidator(serviceReader);

        expect(() => validator.validateServiceConfig()).toThrow();
    });

    it('Does not permit invalid environment config 1', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: false,
            bindingAction: 'BindServiceIdToConstantValue',
            serviceId: EndpointConstructor,
            targetClass: EndpointConstructor,
        });

        const validator = new GenericValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('If service is not global, bound environments must be specified');
    });

    it('Does not permit invalid service ID list config', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToConstantValue',
            serviceId: [ EndpointConstructor ],
            targetClass: EndpointConstructor,
        });

        const validator = new GenericValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('"List of serviceIds provided to a binding action which can only bind single services');
    });
});
