import ValidatorFactory from './ValidatorFactory';
import BoundServiceReader from '../../BoundServiceReader';
import BindClassToSingletonScopeValidator from '../BindClassToSingletonScopeValidator';
import BindMultipleServiceIdsToConstantValueValidator from '../BindMultipleServiceIdsToConstantValueValidator';
import BindServiceIdToClassValidator from '../BindServiceIdToClassValidator';
import GenericValidator from '../GenericValidator';
import {BindingAction} from '../../BindingAction';
import {ServiceId} from "../../Example/ServiceId";
import FileReader from "../../Example/Class/FileReader";

describe('Returns correct validator', () =>
{
    it(BindingAction.BindClassToSingletonScope, () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindClassToSingletonScope,
            serviceId: ServiceId.FileReaderInterface,
            targetClass: FileReader,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(BindClassToSingletonScopeValidator);
    });

    it(BindingAction.BindMultipleServiceIdsToConstantValue, () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindMultipleServiceIdsToConstantValue,
            serviceId: ServiceId.FileReaderInterface,
            targetClass: FileReader,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(BindMultipleServiceIdsToConstantValueValidator);
    });

    it(BindingAction.BindMultipleServiceIdsToConstantValue, () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindMultipleServiceIdsToConstantValue,
            serviceId: ServiceId.FileReaderInterface,
            targetClass: FileReader,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(BindMultipleServiceIdsToConstantValueValidator);
    });

    it('BindServiceIdToClass', () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            serviceId: ServiceId.FileReaderInterface,
            targetClass: FileReader,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(BindServiceIdToClassValidator);
    });

    it('Returns Generic for all other Actions', () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClassInSingletonScope,
            serviceId: ServiceId.FileReaderInterface,
            targetClass: FileReader,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(GenericValidator);
    });
});
