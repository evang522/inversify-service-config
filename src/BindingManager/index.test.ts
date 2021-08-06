import ValidatorFactory from '../BinderValidator/ValidatorFactory/ValidatorFactory';
import BindingManager from './BindingManager';
import {BindingAction} from '../BindingAction';
import GenericValidator from '../BinderValidator/GenericValidator/GenericValidator';
import BoundServiceReader from '../BoundServiceReader';
import BoundServiceStructure from '../BoundServiceStructure';
import BinderFactory from '../Binder/BinderFactory/BinderFactory';
import ServiceIdToClassBinder from '../Binder/ServiceIdToClassBinder/ServiceIdToClassBinder';
import Environment from "../Environment/Environment";
import {Container} from "inversify";
import {ServiceId} from "../Example/ServiceId";
import HttpClient from "../Example/Class/HttpClient";

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

        const manager = new BindingManager([boundServiceConfig],
            new Environment('dev'),
            new Container(),
            undefined,
            validatorFactory,
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
            environments: ['staging'],
        };

        const container = new Container();
        const binder = new ServiceIdToClassBinder(
            new BoundServiceReader(boundServiceConfig),
            container
        );

        binder.bindService = jest.fn();

        const binderFactory = new BinderFactory();

        binderFactory.resolveBinder = jest.fn()
            .mockReturnValue(binder);

        const manager = new BindingManager([boundServiceConfig],
            new Environment('dev'),
            container,
            binderFactory,
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

        const container = new Container();
        const binder = new ServiceIdToClassBinder(
            new BoundServiceReader(boundServiceConfig),
            container,
        );

        binder.bindService = jest.fn();

        const binderFactory = new BinderFactory();

        binderFactory.resolveBinder = jest.fn()
            .mockReturnValue(binder);

        const manager = new BindingManager([boundServiceConfig],
            new Environment('prod'),
            container,
            binderFactory,
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
            environments: ['development'],
        };

        const container = new Container();
        const binder = new ServiceIdToClassBinder(
            new BoundServiceReader(boundServiceConfig),
            container,
        );

        binder.bindService = jest.fn();

        const binderFactory = new BinderFactory();

        binderFactory.resolveBinder = jest.fn()
            .mockReturnValue(binder);

        const manager = new BindingManager([boundServiceConfig],
            new Environment('development'),
            container,
            binderFactory,
        );

        manager.processServicesConfig();

        expect(binder.bindService).toHaveBeenCalledTimes(1);
    });
});
