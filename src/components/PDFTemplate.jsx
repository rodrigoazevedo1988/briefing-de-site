import React from 'react'
import { SECTIONS, FIELDS } from '../data/fields'

export default function PDFTemplate({ data }) {
  const formatValue = (value) => {
    if (!value) return '_____________________________________________'
    if (Array.isArray(value)) return value.join(', ')
    return value
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '___/___/______'
    const d = new Date(dateStr)
    return d.toLocaleDateString('pt-BR')
  }

  return (
    <div
      id="briefing-pdf-template"
      style={{
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: '11px',
        lineHeight: 1.5,
        color: '#333',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#fff',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, letterSpacing: '2px' }}>
          BRIEFING
        </h1>
        <h2 style={{ fontSize: '18px', fontWeight: 'normal', margin: '5px 0', color: '#666' }}>
          Criação de Site
        </h2>
        <p style={{ fontSize: '11px', color: '#888', marginTop: '10px' }}>
          Documento de descoberta do projeto
        </p>
      </div>

      <div style={{ marginBottom: '20px', fontSize: '11px', color: '#555', textAlign: 'center' }}>
        <p style={{ margin: '0 0 10px 0' }}>
          Este briefing é o ponto de partida do seu projeto.
        </p>
        <p style={{ margin: 0 }}>
          Quanto mais detalhada for cada resposta, mais o site refletirá
          a essência da sua empresa e os objetivos do seu negócio.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <div>
          <strong>PREENCHIDO POR</strong>
          <br />
          <span style={{ color: '#666' }}>
            Nome e cargo: <span style={{ color: '#000' }}>{data.preenchidoPor || '_________________________'}</span>
          </span>
        </div>
        <div>
          <strong>DATA</strong>
          <br />
          <span style={{ color: '#000' }}>{formatDate(data.data)}</span>
        </div>
      </div>

      {SECTIONS.map((section) => {
        const sectionFields = FIELDS.filter((f) => f.section === section.id)
        const sectionTitles = {
          '01': 'A Empresa',
          '02': 'Produtos e Serviços',
          '03': 'Público-Alvo',
          '04': 'Sobre o Site',
          '05': 'Identidade Visual',
          '06': 'Informações Complementares',
        }

        return (
          <div key={section.id} style={{ marginBottom: '25px' }}>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '15px',
                paddingBottom: '5px',
                borderBottom: '2px solid #333',
              }}
            >
              SEÇÃO {section.id}
              <br />
              <span style={{ fontSize: '12px', textTransform: 'uppercase' }}>
                {sectionTitles[section.id]}
              </span>
            </div>

            {sectionFields.map((field) => (
              <div key={field.id} style={{ marginBottom: '18px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {field.id}. {field.label}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#666',
                    fontStyle: 'italic',
                    marginBottom: '6px',
                  }}
                >
                  Como responder: {field.howToAnswer}
                </div>

                <div
                  style={{
                    minHeight: '60px',
                    padding: '10px',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '6px',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                  }}
                >
                  {formatValue(data[field.id])}
                </div>

                {field.example && (
                  <div
                    style={{
                      fontSize: '9px',
                      color: '#856404',
                      backgroundColor: '#fff3cd',
                      padding: '8px',
                      borderRadius: '4px',
                      borderLeft: '3px solid #ffc107',
                    }}
                  >
                    <strong>Exemplo: </strong>
                    {field.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      })}

      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#666',
          borderTop: '1px solid #ddd',
        }}
      >
        <p style={{ margin: 0 }}>
          Obrigado pelo seu tempo. Cada detalhe respondido aqui contribui para um resultado mais alinhado com a sua marca.
        </p>
      </div>
    </div>
  )
}
