import OpenAI, { ClientOptions } from 'openai';
import * as Errors from 'openai/error';
import { Chat } from './chat/chat.types';
import { Images } from './images/images';

/**
 * Read an environment variable.
 *
 * Will return undefined if the environment variable doesn't exist or cannot be accessed.
 */
const readEnv = (env: string): string | undefined => {
  if (typeof process !== 'undefined') {
    return process.env?.[env] ?? undefined;
  }
  return undefined;
};

const isRunningInBrowser = () => {
  return (
    // @ts-ignore
    typeof window !== 'undefined' &&
    // @ts-ignore
    typeof window.document !== 'undefined' &&
    // @ts-ignore
    typeof navigator !== 'undefined'
  );
};

interface TMerlinConfig {
  apiKey: string;
  maxRetries?: number;
  fallbackModels?: string[];
}

interface TClientOptions extends ClientOptions {
  merlinConfig?: TMerlinConfig;
}

export class Merlin extends OpenAI {
  merlinConfig: TMerlinConfig;

  /**
   * API Client for interfacing with the OpenAI API.
   *
   * @param {string} [opts.apiKey==process.env['OPENAI_API_KEY'] ?? undefined]
   * @param {string | null} [opts.organization==process.env['OPENAI_ORG_ID'] ?? null]
   * @param {string} [opts.baseURL] - Override the default base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   */
  constructor({
    apiKey = readEnv('OPENAI_API_KEY'),
    organization = readEnv('OPENAI_ORG_ID') ?? null,
    ...opts
  }: TClientOptions = {}) {
    // if user sends merlinConfig
    const { merlinConfig: merlinConfig, ...baseOpenaiOptions } = opts;

    if (apiKey === undefined && merlinConfig?.apiKey === undefined) {
      throw new Errors.OpenAIError(
        "The OPENAI_API_KEY environment variable is missing or empty & No Merlin Key was provided; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' })."
      );
    }
    if (apiKey === undefined) {
      console.warn(
        '\x1b[33m%s\x1b[0m',
        'WARNING: Only Merlin key is set, some OpenAI features like finetuning or Assistants API wont work'
      );
      apiKey = 'sk-undefined';
    }

    const options: ClientOptions = {
      apiKey,
      organization,
      ...baseOpenaiOptions,
      baseURL: baseOpenaiOptions.baseURL ?? 'https://api.openai.com/v1',
    };

    if (!options.dangerouslyAllowBrowser && isRunningInBrowser()) {
      throw new Errors.OpenAIError(
        "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n"
      );
    }

    if (!merlinConfig) {
      throw new Errors.OpenAIError('Merlin config is missing');
    }

    super({
      apiKey: apiKey,
      organization: organization,
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 600000 /* 10 minutes */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
      defaultHeaders: {
        ...options.defaultHeaders,
        // TODO: Address Potential Problem of sending merlin config to openai
        'x-merlin-key': merlinConfig.apiKey,
        'x-merlin-fallback-models':
          merlinConfig.fallbackModels?.join(',') ?? '',
        'x-merlin-retries': merlinConfig.maxRetries?.toString() ?? '2',
      },
    });

    this.merlinConfig = merlinConfig;
    this.apiKey = apiKey ?? '';
    this.organization = organization;
  }

  chat: Chat = new Chat(this);
  images: Images = new Images(this);
}
