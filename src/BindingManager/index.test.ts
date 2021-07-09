import ValidatorFactory from '../Validator/ValidatorFactory/ValidatorFactory';
import BindingManager from './BindingManager';
import ServiceId from '../../../../../application/_config/ServiceId';
import { BindingAction } from '../BindingAction';
import HttpClient from '../../../Client/HttpClient';
import GenericValidator from '../Validator/GenericValidator/GenericValidator';
import BoundServiceReader from '../BoundServiceReader';
import BoundServiceStructure from '../BoundServiceStructure';
import AppConfigBuilder from '../../../../../application/Fixture/AppConfigBuilder';
import BinderFactory from '../Binder/BinderFactory/BinderFactory';
import ServiceIdToClassBinder from '../Binder/ServiceIdToClassBinder/ServiceIdToClassBinder';

describe('Validation', () =>
{
    it('Calls Validator for Service', () =>
    {
        const boundServiceConfig = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: HttpClient,
            global: true,
        };

        const validatorFactory = new ValidatorFactory();
        const validator = new GenericValidator(
            new BoundServiceReader(boundServiceConfig)
        );

        validator.validateServiceConfig = jest.fn();

        validatorFactory.resolveValidator = jest.fn()
            .mockReturnValue(validator);

        const manager = new BindingManager([ boundServiceConfig ],
            undefined,
            validatorFactory,
            undefined
        );

        manager.processServicesConfig();

        expect(validatorFactory.resolveValidator).toHaveBeenCalled();
        expect(validator.validateServiceConfig).toHaveBeenCalled();
    });
});

describe('Environment and binding', () =>
{
    it('Does not execute binding service if it is not intended for this environment', () =>
    {
        const boundServiceConfig: BoundServiceStructure = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: HttpClient,
            global: false,
            environments: [ 'staging' ],
        };

        const binder = new ServiceIdToClassBinder(
            new BoundServiceReader(boundServiceConfig)
        );

        binder.bindService = jest.fn();

        const binderFactory = new BinderFactory();

        binderFactory.resolveBinder = jest.fn()
            .mockReturnValue(binder);

        const manager = new BindingManager([ boundServiceConfig ],
            binderFactory,
            undefined,
            new AppConfigBuilder().fromProductionEnv(),
        );

        manager.processServicesConfig();

        expect(binder.bindService).toHaveBeenCalledTimes(0);
    });

    it('Executes binding service if it is Global', () =>
    {
        const boundServiceConfig: BoundServiceStructure = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: HttpClient,
            global: true,
        };

        const binder = new ServiceIdToClassBinder(
            new BoundServiceReader(boundServiceConfig)
        );

        binder.bindService = jest.fn();

        const binderFactory = new BinderFactory();

        binderFactory.resolveBinder = jest.fn()
            .mockReturnValue(binder);

        const manager = new BindingManager([ boundServiceConfig ],
            binderFactory,
            undefined,
            new AppConfigBuilder().fromProductionEnv(),
        );

        manager.processServicesConfig();

        expect(binder.bindService).toHaveBeenCalledTimes(1);
    });

    it('Executes service binding if it is intended for this environment', () =>
    {
        const boundServiceConfig: BoundServiceStructure = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: HttpClient,
            global: false,
            environments: [ 'development' ],
        };

        const binder = new ServiceIdToClassBinder(
            new BoundServiceReader(boundServiceConfig)
        );

        binder.bindService = jest.fn();

        const binderFactory = new BinderFactory();

        binderFactory.resolveBinder = jest.fn()
            .mockReturnValue(binder);

        const manager = new BindingManager([ boundServiceConfig ],
            binderFactory,
            undefined,
            new AppConfigBuilder().fromDevelopmentEnv(),
        );

        manager.processServicesConfig();

        expect(binder.bindService).toHaveBeenCalledTimes(1);
    });
});
