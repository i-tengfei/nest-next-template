import { plainToClass } from 'class-transformer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Hello } from 'src/server/app.model.hello'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Hello>,
) {
  res.status(200).json(plainToClass(Hello, { Hello: 'World' }))
}
