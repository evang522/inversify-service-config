import BoundServiceReader from '../../BoundServiceReader';
import GenericValidator from './GenericValidator';
import {BindingAction} from "../../BindingAction";
import FileReader from "../../Example/Class/FileReader";

describe('validate', () =>
{
    it('Permits generally valid config passing through', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            serviceId: FileReader,
            targetClass: FileReader,
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
            environments: ['production'],
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            serviceId: FileReader,
            targetClass: FileReader,
        });

        const validator = new GenericValidator(serviceReader);

        expect(() => validator.validateServiceConfig()).toThrow();
    });

    it('Does not permit invalid environment config 1', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: false,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            serviceId: FileReader,
            targetClass: FileReader,
        });

        const validator = new GenericValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('If service is not global, bound environments must be specified');
    });

    it('Does not permit invalid service ID list config', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            serviceId: [FileReader],
            targetClass: FileReader,
        });

        const validator = new GenericValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('"List of serviceIds provided to a binding action which can only bind single services');
    });
});
