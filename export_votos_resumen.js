// Para ejecutar hacer:
// 1. Rellenar variable topicID
// 2. mongo localhost:26017/estamos-listas-prod --quiet export_votos_resumen.js > estamos-listas-votos-resumen.txt

topicID = "FFF"

t = db.topics.findOne(
	{_id: ObjectId(topicID)},
	{'attrs.pregunta':1, mediaTitle:1, 'action.count':1, 'action.results':1}
)
r = t.action.results

print(`Título: ${t.mediaTitle}
Pregunta: ${t.attrs.pregunta}
Votos: ${t.action.count}`)

r.forEach(r => print(`Respuesta: %${r.percentage} (${r.votes} votos) ${r.value}`))
