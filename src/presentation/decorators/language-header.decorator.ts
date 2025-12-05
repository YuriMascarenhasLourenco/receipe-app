import { ApiHeader } from '@nestjs/swagger';

export const LanguageHeader = () =>
  ApiHeader({
    name: 'accept-language',
    description: 'Language for validation messages (eg: pt, en)',
    required: false,
    schema: {
      type: 'string',
      example: 'en',
    },
  });
