import { z } from "zod";
import PQueue from 'p-queue';
import { getPersona, Persona } from '../persona/persona.js';
import { getSystemMessage } from '../prompts/system.js';
import { generate } from '../prompts/user.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import * as AIChatService from "../services/AIChatService.js";
import { ChatServiceOptions } from "../services/AIChatService.js"
import { EventIterator } from "event-iterator";
import retry from 'async-retry';

export function answerSelectQuestion(
    question: string,
    personaAmount: number,
    responseOptions: string[],
    options: z.infer<typeof ChatServiceOptions>): AsyncIterable<{ answer: string, persona: Persona }> {
    const queue = new PQueue({ concurrency: 10 });

    for (let i = 0; i < personaAmount; i++) {
        queue.add(async () => {
            const newPersona = getPersona();
            const systemMessage = getSystemMessage(newPersona);
            const shuffledOptions = responseOptions.sort(() => Math.random() - 0.5);
            const responseSchema = z.object({
                answer: z.enum(shuffledOptions as [string, ...string[]]),
            })
            const stringSchema = JSON.stringify(zodToJsonSchema(responseSchema))
            const userPrompt = generate(
                stringSchema,
                question,
            );
            const response = await retry(
                async () => await AIChatService.chat<typeof responseSchema>(systemMessage, userPrompt, stringSchema, options),
                { retries: 3, minTimeout: 1000, maxTimeout: 10000, randomize: true }
            )
            
            const fullPersonaResponse = {
                answer: response.answer,
                persona: newPersona,
            };
            return fullPersonaResponse;
        });
    }

    let eventsPushedAmout = 0;
    return new EventIterator<{ answer: string, persona: Persona }>(({ push, stop }) => {
        queue.on('completed', (result: { answer: string, persona: Persona }) => {
            eventsPushedAmout++;
            push(result);
            if (eventsPushedAmout === personaAmount) {
                stop();
            }
        });
    });
}
