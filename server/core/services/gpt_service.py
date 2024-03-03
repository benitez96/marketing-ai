from openai import OpenAI
from pprint import pprint as print

from core.models import Prompt
from core.schemas.prompt import PromptCreate


class OpenAIService:
    def __init__(self, api_key: str, model: str, temperature: float = 0.5):
        self.client = OpenAI(api_key=api_key)
        self.model = model
        self.temperature = temperature

    def get_response(self, messages) -> Prompt:
        response = self.client.chat.completions.create(
            model=self.model, temperature=self.temperature, messages=messages
        )

        if response.choices[0].finish_reason:
            return PromptCreate(
                input_tokens=response.usage.prompt_tokens,
                output_tokens=response.usage.completion_tokens,
                prompt=str(messages),
                response=response.choices[0].message.content,
            )

    async def get_stream(self, prompt):
        stream = self.client.chat.completions.create(
            model=self.model,
            temperature=self.temperature,
            stream=True,
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant to make content for webmarketing. You are a chatbot with a friendly personality.",
                },
                {
                    "role": "system",
                    "content": f"Your reponses should have this format {self.response_format} in JSON",
                },
                {"role": "user", "content": prompt},
            ],
        )

        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                print(chunk.choices[0].delta.content, end="")
                return chunk
