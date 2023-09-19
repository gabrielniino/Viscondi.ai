import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { createTranscriptionRoute } from './routes/create-transciption'
import { generateAiCompletionRoute } from './routes/generate-ai-completion'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'

const app = fastify()

// Mudar a origin para a url do frontend
app.register(fastifyCors, {
    origin: '*'
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAiCompletionRoute)

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running!')
})