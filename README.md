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

### Support

Should you encounter any issues or have questions regarding the `merlin-node` package, please file an issue through the issue tracker on the package's repository.

Happy coding!

---

**Note**: Replace `<API_KEY>` with your actual API key for Merlin APIs.
