from sqlmodel import SQLModel


class PromptCreate(SQLModel):
    input_tokens: int
    output_tokens: int
    prompt: str
    response: str


class PromptRead(SQLModel):
    id: int
    response: str
