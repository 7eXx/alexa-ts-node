import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { IntentRequest, Response } from 'ask-sdk-model';

export const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'Welcome to Raspberry Pi Automation. What would you like to do?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

export const ControlDeviceIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ControlDeviceIntent';
    },
    handle(handlerInput: HandlerInput): Response {
        const intentRequest = handlerInput.requestEnvelope.request as IntentRequest;
        const action = intentRequest.intent.slots?.action.value;
        let speechText = `Turning device ${action}.`;

        // Add your Raspberry Pi automation logic here
        if (action === 'on') {
            console.log('Turning on the device');
        } else if (action === 'off') {
            // Code to turn off the device
            console.log('Turning off the device');
        } else {
            speechText = 'Invalid action.';
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};