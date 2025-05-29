import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function FinancialAssistant() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const askAssistant = async () => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')

    try {
      const response = await fetch('/financial-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ question }),
      })

      const data = await response.json()
      setAnswer(data.answer || 'Sin respuesta.')
    } catch (error) {
      setAnswer('Ocurrió un error al contactar con la IA.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold">Asistente Financiero</h2>
          <Textarea
            placeholder="¿En qué te puedo ayudar financieramente?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
          />
          <Button onClick={askAssistant} disabled={loading}>
            {loading ? 'Pensando...' : 'Preguntar'}
          </Button>
        </CardContent>
      </Card>

      {answer && (
        <Card>
          <CardContent className="p-6 space-y-2">
            <h3 className="font-semibold">Respuesta:</h3>
            <p className="whitespace-pre-wrap">{answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
