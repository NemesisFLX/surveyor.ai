import { z } from "zod";
import { SurveyRegions } from "../enums/SurveyRegions.js";
import { ChatServiceOptions } from "../services/AIChatService.js"

export interface SurveyBuilderOptions {
    question: string | undefined,
    context: string | undefined,
    region: SurveyRegions | undefined,
    amount: number | undefined;
    aiChatServiceOptions: z.infer<typeof ChatServiceOptions>
}

interface DemographicsOptions {
    sex?: Array<"female" | "male">
    age?: string,
    citizenship?: string,
    ethnicity?: string,
    "net-income"?: string,
    residency?: string,
    education?: string,
    religion?: string,
    occupation?: string,
    "martial-status"?: string
}

export class SurveyBuilder {

    protected _context: string | undefined;
    protected _question: string | undefined;
    protected _region: SurveyRegions | undefined;
    protected _amount: number | undefined;
    protected _aiChatServiceOptions: z.infer<typeof ChatServiceOptions>

    public constructor(options?: SurveyBuilderOptions) {
        this._context = options?.context;
        this._question = options?.question;
        this._region = options?.region;
        this._amount = options?.amount;
        this._aiChatServiceOptions = options?.aiChatServiceOptions ?? { type: "OpenAI" }
    }

    public context(context: string): this {
        this._context = context
        return this
    }

    public question(question: string): this {
        this._question = question
        return this
    }

    public region(region: SurveyRegions): this {
        this._region = region
        return this
    }

    public amount(amount: number): this {
        this._amount = amount
        return this
    }

    public aiChatServiceOptions(aiChatServiceOptions: z.infer<typeof ChatServiceOptions>): this {
        this._aiChatServiceOptions = aiChatServiceOptions
        return this
    }

    public type<T extends SurveyBuilder>(SubSurveyBuilder: new (options?: SurveyBuilderOptions) => T): T {
        return new SubSurveyBuilder({
            context: this._context,
            question: this._question,
            region: this._region,
            amount: this._amount,
            aiChatServiceOptions: this._aiChatServiceOptions
        })
    }

    public demographics(options: DemographicsOptions): this {
        return this
    }
}
