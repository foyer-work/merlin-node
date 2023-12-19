# README

## merlin-node

`merlin-node` is a Node.js client package for easy interaction with the Merlin APIs, allowing users to access various machine learning models for vision and language tasks. This README will guide you through installation, configuration, and usage of `merlin-node`.

### Installation

To install the `merlin-node` package, run the following command in your terminal:

```sh
npm install merlin-node --save
```

or if you prefer using `yarn`:

```sh
yarn add merlin-node
```

### Configuration

Before using `merlin-node`, you need to set up your API key provided by Merlin APIs. This key is necessary for authentication and authorizing your requests.

```javascript
import { Merlin } from 'merlin-node';

const apiKey = '<API_KEY>'; // Replace with your API key
const merlin = new Merlin({ merlinConfig: { apiKey: apiKey } });
```

### Vision Based Models

To use vision-based models like Leonardo and DALL-E with `merlin-node`, you can follow the given example to generate images from textual descriptions:

```javascript
import { Merlin } from 'merlin-node';

const merlin = new Merlin({ merlinConfig: { apiKey: '<API_KEY>' } });

async function generateImage() {
  try {
    const response = await merlin.images.generate({
      prompt: 'This is a picture of a dog',
      model: 'dall-e-2', // or 'leonardo' for the Leonardo model
      size: '256x256',
      response_format: 'b64_json',
    });

    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

generateImage();
```

This code sets up a function to request the generation of an image based on the specified prompt, model, and size.

### Language Models

For language models like OpenAI, Mistral, Gemini, Anthropic, etc., `merlin-node` offers a simple interface as showcased below:

```javascript
import { Merlin } from 'merlin-node';

const merlin = new Merlin({ merlinConfig: { apiKey: 'MERLIN_API_KEY_HERE' } });

async function createCompletion() {
  try {
    const completion = await merlin.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'gpt-3.5-turbo', // Adjust model as needed
    });

    console.log(completion.choices[0]);
  } catch (error) {
    console.error('Error creating completion:', error);
  }
}

createCompletion();
```

This snippet demonstrates how to send a system message and obtain a completion from the specified language model.

# Support

For quick questions or to engage with the `merlin-api` community, please join our [Discord server](https://discord.com/invite/ZnhUMV3NbD).

## Detailed Inquiries

For detailed inquiries or private matters, reach out to the Merlin team via email:

- **Siddhartha**: siddhartha@getmerlin.in

Please provide a clear and detailed explanation of the issue you’re experiencing to streamline the support process.

## Social Media

Follow us on Twitter [@foyerwork](https://twitter.com/foyerwork) for regular updates, tips, and community highlights.

Connect with us on [LinkedIn](https://www.linkedin.com/company/foyer-work/) for more professional engagement and company news.

## Raising Issues & Feature Requests

Encounter a bug or want to suggest a new feature for `merlin-api`? Raise a ticket directly on our GitHub repository:

[Merlin Node GitHub Repo](https://github.com/foyer-work/merlin-node)

To open an issue:

- Visit the [Issues tab](https://github.com/foyer-work/merlin-node/issues) and click on `New Issue`.
- Provide a detailed description of the issue or feature request.
- Submit the form to create the issue. Our team will review it and respond accordingly.

## Reporting Urgent Issues

If you find a security vulnerability or an issue that should be addressed immediately:

- Email us at siddhartha@getmerlin.in with the subject line "Urgent Issue".
- Include all relevant details, steps to reproduce, and any other information that can help us understand the urgency of the issue.

## Documentation

Visit our [homepage](http://api.getmerlin.in/docs) for comprehensive documentation and API guides.

For additional support, explore the resources listed on our [main page](http://getmerlin.in).


---

We’re committed to providing you with the support you need to make the most out of `merlin-api`. Don't hesitate to reach out with any concerns or questions you may have.  


---

**Note**: Replace `<API_KEY>` with your actual API key for Merlin APIs.
